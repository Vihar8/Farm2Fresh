const mongoose = require('mongoose');

const EnquiryFormSchema = new mongoose.Schema({
    email:
    {   
        type: String, 
        required: true 
    },
    mobile: 
    { 
        type: String, 
        required: true 
    },
    requirement: 
    { 
        type: String, 
        required: true 
    },
    createdAt: { type: Date, default: Date.now },
    });

module.exports = mongoose.model('Enquiryform', EnquiryFormSchema);
