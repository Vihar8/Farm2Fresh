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
    }
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
