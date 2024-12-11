const Commodity = require('../models/commodity');

// Controller to add a new commodity
exports.addCommodity = async (req, res) => {
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
            images: imagePaths,
            createdBy: req.user.id
        });

        await newCommodity.save();
        res.status(201).json({ message: 'Commodity added successfully', commodity: newCommodity });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add commodity', details: error.message });
    }
};

// Controller to get all commodities
exports.getCommodities = async (req, res) => {
    try {
        const commodities = await Commodity.find().populate('createdBy', 'name email'); 
        res.json(commodities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch commodities', details: error.message });
    }
};
