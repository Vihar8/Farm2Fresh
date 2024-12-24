const mongoose = require('mongoose');
const { applyTimestamps } = require('./commodity');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true, // Optional: Ensure mobile is unique
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'], // Optional: Validate mobile number format
    },
    password: {
        required: true,
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: String,
    role: {
        type: Number,
        enum: [1, 2], // 1 for client, 2 for admin
        default: 1 // Default to client
    },
    user_type: {
        type: String,
        enum: ['buyer', 'seller'], // Values restricted to "buyer" and "seller"
        required: true
    }
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
