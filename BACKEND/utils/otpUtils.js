const crypto = require('crypto');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * @returns {string} 
 */
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

/**
 * @returns {Date} 
 */
const getOTPExpiry = () => {
    return new Date(Date.now() + 10 * 60 * 1000);
};

/**
 * @param {string} email
 * @param {string} name 
 * @param {string} otp
 * @returns {Promise} 
 */

const sendOTPEmail = async (email, name, otp) => {
    try {
        const response = await resend.emails.send({
            from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
            to: [email],
            subject: 'Verify Your Email - OTP Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333; text-align: center;">Email Verification</h2>
                    <p>Hello ${name},</p>
                    <p>Thank you for registering with us! Please use the following OTP to verify your email address:</p>

                    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
                        <h1 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
                    </div>

                    <p><strong>This OTP is valid for 10 minutes only.</strong></p>
                    <p>If you didn't request this verification, please ignore this email.</p>

                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">This is an automated email, please do not reply.</p>
                </div>
            `
        });

        return response;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send verification email');
    }
};

/** 
 * @param {string} providedOTP
 * @param {string} storedOTP
 * @param {Date} otpExpiry
 * @returns {boolean}
 */

const verifyOTP = (providedOTP, storedOTP, otpExpiry) => {
    console.log('verifyOTP called with:');
    console.log('- providedOTP:', providedOTP, typeof providedOTP);
    console.log('- storedOTP:', storedOTP, typeof storedOTP);
    console.log('- otpExpiry:', otpExpiry);

    if (!providedOTP || !storedOTP || !otpExpiry) {
        console.log('Missing required parameters');
        return false;
    }

    if (new Date() > otpExpiry) {
        console.log('OTP has expired');
        return false;
    }

    const match = String(providedOTP).trim() === String(storedOTP).trim();
    console.log('OTP match result:', match);
    return match;
};

module.exports = {
    generateOTP,
    getOTPExpiry,
    sendOTPEmail,
    verifyOTP
};