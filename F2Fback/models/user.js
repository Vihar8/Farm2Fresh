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
    // address: {
    //     type: String
    // },
    // mobile: {
    //     type: String,
    //     required: true
    // },
    isVerified:{
        type: Boolean,
        default: false
    },
    verificationCode: String,
},{timestamps:true})


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;