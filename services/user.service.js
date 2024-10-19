    const { User, Token } = require('../models');
    const jwt = require('jsonwebtoken');
    const { secret_key } = require("../config/jwt.js");
    const AWS = require('aws-sdk');
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET_NAME } = require('../config/aws.js');
    const moment = require('moment');

    const s3 = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: AWS_REGION
    });

    const userService = {
        register: async (userData) => {
            const { email } = userData;

            const existingUser = await User.findOne({
                where: { email }
            });

            if (existingUser) {
                throw new Error('User already exists');
            }

            const newUser = await User.create(userData);

            return await userService.getMe(newUser.id);
        },

        login: async (credentials) => {
            const { email, password } = credentials;

            const user = await User.findOne({
                where: { email }
            });

            if (!user) {
                throw new Error('Invalid email or password');
            }

            const isPasswordValid = await user.validatePassword(password);
            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            const token = jwt.sign({ id: user.id, email: user.email }, secret_key, { expiresIn: '1d' });

            const expiresAt = moment().add(1, 'days').toDate();
            await Token.create({
                user_id: user.id,
                token,
                expires_at: expiresAt
            });

            return token;
        },

        logout: async (token) => {
            const tokenRecord = await Token.findOne({ where: { token } });

            if (!tokenRecord) {
                throw new Error('Invalid token or user not logged in');
            }

            await tokenRecord.destroy();
        },

        updateProfile: async (userId, profileData, profileImage) => {
            const user = await User.findByPk(userId);

            if (!user) {
                throw new Error('User not found');
            }

            const updatedFields = {};

            if (profileData.first_name) {
                updatedFields.first_name = profileData.first_name;
            }

            if (profileData.last_name) {
                updatedFields.last_name = profileData.last_name;
            }

            if (profileImage) {
                const uploadResult = await uploadFileToS3(profileImage);
                updatedFields.profile_image = uploadResult.Location;
            }

            return await userService.getMe(userId);
        },

        getMe: async (userId) => {
            const user = await User.findByPk(userId, {
                attributes: { exclude: ['password'] }
            });

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        },

        getBalance: async (userId) => {
            const user = await User.findByPk(userId, {
                attributes: ['balance']
            });
    
            if (!user) {
                throw new Error('User not found');
            }
    
            return user.balance;
        }
    };

    const uploadFileToS3 = (file) => {
        const { originalname, buffer } = file; 
        const params = {
            Bucket: AWS_S3_BUCKET_NAME,
            Key: `profile-images/${Date.now()}-${originalname}`, 
            Body: buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };

        return s3.upload(params).promise();
    };

    module.exports = userService;
