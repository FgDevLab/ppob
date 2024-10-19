const jwt = require('jsonwebtoken');
const { secret_key } = require('../config/jwt.js');
const { ResponseFormatter } = require('../utils/response.js');
const Token = require('../models/token.model.js'); 

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return ResponseFormatter.unauthorized(res);
    }

    try {
        const decoded = jwt.verify(token, secret_key);
        
        const storedToken = await Token.findOne({
            where: { user_id: decoded.id, token }
        });

        if (!storedToken || storedToken.expires_at < new Date()) {
            return ResponseFormatter.unauthorized(res, 'Token is invalid or has expired');
        }

        req.user = { id: decoded.id };
        next();
    } catch (err) {
        return ResponseFormatter.unauthorized(res, 'Invalid token');
    }
};

module.exports = { authenticate }