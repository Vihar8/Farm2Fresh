const express = require('express');
const router = express.Router();
const Commodity = require('../models/commodity');
const upload = require('../middlewares/multerConfig.js'); // Path to multer configuration

// Add a new commodity
router.post('/', upload.array('images', 2), async (req, res) => {
    try {
        const { commodity, varietyType, quantity, totalIn, price, state, district } = req.body;
        const imagePaths = req.files.map(file => file.path);

        const newCommodity = new Commodity({
            commodity,
            varietyType,
            quantity,
            totalIn,
            price,
            state,
            district,
            images: imagePaths
        });

        await newCommodity.save();
        res.status(201).json({ message: 'Commodity added successfully', commodity: newCommodity });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add commodity', details: error.message });
    }
});

// Get all commodities
router.get('/', async (req, res) => {
    try {
        const commodities = await Commodity.find();
        res.json(commodities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch commodities', details: error.message });
    }
});

module.exports = router;
