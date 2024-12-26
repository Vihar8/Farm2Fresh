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
            createdBy: req.user._id  // Ensure createdBy is the logged-in user's ID
        });

        await newCommodity.save();
        res.status(201).json({ message: 'Commodity added successfully', commodity: newCommodity });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add commodity', details: error.message });
    }
};

// Controller to get all commodities excluding the logged-in user's commodities
exports.getCommodities = async (req, res) => {
    try {
        const commodities = await Commodity.find().populate('createdBy', 'name email'); 
        res.json(commodities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch commodities', details: error.message });
    }
};

// Controller to get seller commodities excluding the logged-in user's commodities
exports.getSellerCommodities = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // The logged-in user's ID

        // Get seller commodities excluding the logged-in user's commodities
        const listings = await Commodity.aggregate([
            {
                $lookup: {
                    from: "users", // Name of the users collection
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "sellerDetails",
                },
            },
            {
                $match: {
                    "sellerDetails.user_type": "seller", // Filter only sellers
                },
            },
            {
                $project: {
                    commodity: 1,
                    varietyType: 1,
                    quantity: 1,
                    totalIn: 1,
                    price: 1,
                    state: 1,
                    district: 1,
                    images: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    seller: {
                        _id: { $arrayElemAt: ["$sellerDetails._id", 0] },
                        name: { $arrayElemAt: ["$sellerDetails.name", 0] },
                        email: { $arrayElemAt: ["$sellerDetails.email", 0] },
                        mobile: { $arrayElemAt: ["$sellerDetails.mobile", 0] },
                    },
                },
            },
            {
                $match: {
                    "seller._id": { $ne: loggedInUserId }, // Exclude the logged-in user from the list of seller commodities
                },
            },
        ]);

        res.status(200).json(listings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to get buyer commodities
exports.getBuyerCommodities = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const listings = await Commodity.aggregate([
            {
                $lookup: {
                    from: "users", // Name of the users collection
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "buyerDetails",
                },
            },
            {
                $match: {
                    "buyerDetails.user_type": "buyer", // Filter only buyers
                },
            },
            {
                $project: {
                    commodity: 1,
                    varietyType: 1,
                    quantity: 1,
                    totalIn: 1,
                    price: 1,
                    state: 1,
                    district: 1,
                    images: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    buyer: {
                        _id: { $arrayElemAt: ["$buyerDetails._id", 0] },
                        name: { $arrayElemAt: ["$buyerDetails.name", 0] },
                        email: { $arrayElemAt: ["$buyerDetails.email", 0] },
                        mobile: { $arrayElemAt: ["$buyerDetails.mobile", 0] },
                    },
                },
            },
            {
                $match: {
                    "buyer._id": { $ne: loggedInUserId }, // Exclude the logged-in user from the list of seller commodities
                },
            },
        ]);

        res.status(200).json(listings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to delete a commodity listing by the logged-in user
exports.deleteCommodity = async (req, res) => {
    try {
        const commodityId = req.params.id; // Get the commodity ID from the request params
        const loggedInUserId = req.user._id; // Get the logged-in user's ID
        console.log("hjkhaj",commodityId);
        // Find the commodity and check ownership
        const commodity = await Commodity.findOne({ _id: commodityId, createdBy: loggedInUserId });
        if (!commodity) {
            return res.status(404).json({ message: "Commodity not found or not authorized to delete" });
        }

        // Delete the commodity
        await Commodity.deleteOne({ _id: commodityId });
        res.status(200).json({ message: "Commodity deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete commodity", details: error.message });
    }
};


// Controller to get logged-in user's commodity listings
exports.getUserCommodities = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Extract logged-in user's ID from the request

        // Fetch commodities created by the logged-in user
        const userCommodities = await Commodity.find({ createdBy: loggedInUserId })
            .sort({ createdAt: -1 }) // Sort by most recent
            .populate("createdBy", "name email"); // Optional: Populate user details if needed

        res.status(200).json({ 
            message: "User commodities fetched successfully", 
            commodities: userCommodities 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Failed to fetch user commodities", 
            details: error.message 
        });
    }
};
