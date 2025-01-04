const mongoose = require('mongoose');

const commoditySchema = new mongoose.Schema({
    commodity:
    {   
        type: String, 
        required: true 
    },
    varietyType: 
    { 
        type: String, 
        required: true 
    },
    quantity: 
    { 
        type: Number, 
        required: true 
    },
    totalIn: 
    { 
        type: String, 
        enum: ['kg', 'mt', 'quintal', 'ton'], 
        required: true 
    },
    price: 
    { 
        type: Number, 
        required: true 
    },
    state: 
    { 
        type: String, 
        required: true 
    },
    district: 
    { 
        type: String, 
        required: true 
    },
    images: [{ type: String }],
    description: { type: String, required: false },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', // Reference to the user model
        required: true 
    }
}, { timestamps: true } // Array of image URLs or paths
);

module.exports = mongoose.model('Commodity', commoditySchema);
