const express = require('express');
const {
    registerUser,
    loginUser,
    getMe,
    updateProfile,
    logoutUser,
    getBalance
} = require('../controllers/user.controller.js');
const { validators } = require('../utils/validations.js');
const { validate } = require('../middleware/validation.middleware.js');
const { authenticate } = require('../middleware/auth.middleware.js');
const multer = require('multer')

const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
        }
        cb(null, true);
    }
});

const router = express.Router();

router.post('/register', validate(validators.registration), registerUser);

router.post('/login', validate(validators.login), loginUser);

router.get('/me', authenticate, getMe);

router.get('/balance', authenticate, getBalance);

router.put('/profile', authenticate, upload.single('profile_image'), validate(validators.updateProfile), updateProfile);

router.post('/logout', authenticate, logoutUser);

module.exports = router;
