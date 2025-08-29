const express = require('express');
const {
    register,
    login, 
    logout, 
    getMyProfile,
    getAdmins,
    verifyOTPController,
    resendOTP,
    forgotPassword,
    verifyPasswordResetOtp,
    resetPassword
} = require('../controller/user.controller');

const { authenticatedUser } = require('../middleware/authUser');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authenticatedUser, logout);
router.get('/my-profile', authenticatedUser, getMyProfile);
router.get('/admins', getAdmins);
router.post('/verify-otp', verifyOTPController);
router.post('/resend-otp', resendOTP);
router.post('/forgot-password', forgotPassword);
router.post('/verify-password-reset-otp', verifyPasswordResetOtp);
router.post('/reset-password', resetPassword);


module.exports = router;
