const userService = require('../services/user.service.js');
const { ResponseFormatter } = require('../utils/response.js');

const registerUser = async (req, res) => {
    try {
        const newUser = await userService.register(req.body);
        return ResponseFormatter.success(res, 'Registration successful', newUser);
    } catch (error) {
        return ResponseFormatter.error(res, error.message);
    }
};

const loginUser = async (req, res) => {
    try {
        const token = await userService.login(req.body);
        return ResponseFormatter.success(res, 'Login successful', { token });
    } catch (error) {
        return ResponseFormatter.error(res, error.message);
    }
};

const updateProfile = async (req, res) => {
    try {
        const { file } = req
        const updateProfile = await userService.updateProfile(req.user.id, req.body, file);
        return ResponseFormatter.success(res, 'Profile updated successfully', updateProfile);
    } catch (error) {
        return ResponseFormatter.error(res, error.message);
    }
};

const getMe = async (req, res) => {
    try {
        const userData = await userService.getMe(req.user.id);
        return ResponseFormatter.success(res, 'User data retrieved successfully', userData);
    } catch (error) {
        return ResponseFormatter.error(res, error.message);
    }
};

const getBalance = async (req, res) => {
    try {
        const balance = await userService.getBalance(req.user.id);
        return ResponseFormatter.success(res, 'Balance retrieved successfully', { balance });
    } catch (error) {
        return ResponseFormatter.error(res, error.message);
    }
};

const logoutUser = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        await userService.logout(token);
        return ResponseFormatter.noContent(res, 'Logout successful');
    } catch (error) {
        return ResponseFormatter.error(res, error.message);
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateProfile,
    getMe,
    getBalance,
    logoutUser
};