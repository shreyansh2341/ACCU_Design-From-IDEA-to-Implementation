const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: function () {
            return !this.isGoogleLogin; // only required if NOT Google login
        },
        select: false,
    },
    isGoogleLogin: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                // phone required only if NOT google login
                if (!this.isGoogleLogin && !v) return false;
                if (v) return /^\d{10}$/.test(v);
                return true;
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    photo: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'vendor'],
        default: 'user',
    },
    token: {
        type: String,
        select: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
        select: false,
    },
    otpExpiry: {
        type: Date,
        select: false,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
