const Commodity = require('../models/commodity');
const cloudinary = require('../middlewares/cloudinaryConfig'); // Assuming cloudinaryConfig handles image uploads
const userModel = require('../models/user');

// Controller to add a new commodity
exports.addCommodity = async (req, res) => {
    try {
        const { commodity, varietyType, quantity, totalIn, price, state, district } = req.body;
        const imagePaths = req.files.map(file => file.path); // Cloudinary URLs

        const newCommodity = new Commodity({
            commodity,
            varietyType,
            quantity,
            totalIn,
            price,
            state,
            district,
            images: imagePaths,
            createdBy: req.user._id, // Logged-in user's ID
        });

        await newCommodity.save();
        res.status(201).json({ message: 'Commodity added successfully', commodity: newCommodity });
    } catch (error) {
        console.error("Error adding commodity:", error);
        res.status(500).json({ error: 'Failed to add commodity', details: error.message });
    }
};

// Controller to get all commodities
exports.getCommodities = async (req, res) => {
    try {
        const commodities = await Commodity.find().populate('createdBy', 'name email');
        res.status(200).json(commodities);
    } catch (error) {
        console.error("Error fetching commodities:", error);
        res.status(500).json({ error: 'Failed to fetch commodities', details: error.message });
    }
};

// Controller to get seller commodities excluding the logged-in user's commodities
exports.getSellerCommodities = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const listings = await Commodity.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "sellerDetails",
                },
            },
            { $match: { "sellerDetails.user_type": "seller" } },
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
            { $match: { "seller._id": { $ne: loggedInUserId } } },
        ]);

        res.status(200).json(listings);
    } catch (error) {
        console.error("Error fetching seller commodities:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to get buyer commodities excluding the logged-in user's commodities
exports.getBuyerCommodities = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const listings = await Commodity.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "buyerDetails",
                },
            },
            { $match: { "buyerDetails.user_type": "buyer" } },
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
            { $match: { "buyer._id": { $ne: loggedInUserId } } },
        ]);

        res.status(200).json(listings);
    } catch (error) {
        console.error("Error fetching buyer commodities:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to delete a commodity listing
exports.deleteCommodity = async (req, res) => {
    try {
        const commodityId = req.params.id;
        const loggedInUserId = req.user._id;

        const commodity = await Commodity.findOne({ _id: commodityId, createdBy: loggedInUserId });
        if (!commodity) {
            return res.status(404).json({ message: "Commodity not found or unauthorized to delete" });
        }

        await Commodity.deleteOne({ _id: commodityId });
        res.status(200).json({ message: "Commodity deleted successfully", commodityId });
    } catch (error) {
        console.error("Error deleting commodity:", error);
        res.status(500).json({ message: "Failed to delete commodity", details: error.message });
    }
};

// Controller to get the logged-in user's commodities
exports.getUserCommodities = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const userCommodities = await Commodity.find({ createdBy: loggedInUserId })
            .sort({ createdAt: -1 })
            .populate("createdBy", "name email");

        res.status(200).json({
            message: "User commodities fetched successfully",
            commodities: userCommodities,
        });
    } catch (error) {
        console.error("Error fetching user commodities:", error);
        res.status(500).json({
            message: "Failed to fetch user commodities",
            details: error.message,
        });
    }
};

// Controller to update a commodity (without changing images)
exports.updateCommodity = async (req, res) => {
    try {
        const commodityId = req.params.id; // Get the commodity ID from the request params
        const { commodity, varietyType, quantity, totalIn, price, state, district } = req.body; // Destructure other fields
        const loggedInUserId = req.user._id; // Get the logged-in user's ID

        // Check if commodityId is provided
        if (!commodityId) {
            return res.status(400).json({ message: 'Commodity ID is required' });
        }

        // Find the commodity to update
        const existingCommodity = await Commodity.findOne({ _id: commodityId, createdBy: loggedInUserId });
        if (!existingCommodity) {
            return res.status(404).json({ message: 'Commodity not found or unauthorized to update' });
        }

        // Update commodity fields, leave images out
        existingCommodity.commodity = commodity || existingCommodity.commodity;
        existingCommodity.varietyType = varietyType || existingCommodity.varietyType;
        existingCommodity.quantity = quantity || existingCommodity.quantity;
        existingCommodity.totalIn = totalIn || existingCommodity.totalIn;
        existingCommodity.price = price || existingCommodity.price;
        existingCommodity.state = state || existingCommodity.state;
        existingCommodity.district = district || existingCommodity.district;

        // Save the updated commodity details
        await existingCommodity.save();

        res.status(200).json({ message: 'Commodity updated successfully', commodity: existingCommodity });
    } catch (error) {
        console.error('Error updating commodity:', error);
        res.status(500).json({ message: 'Failed to update commodity', details: error.message });
    }
};

// Controller to get the counts of seller and buyer commodities for the dashboard
exports.getDashboardCounts = async (req, res) => {
    try {
        const totalSellerCommodities = await Commodity.aggregate([
            {
                $lookup: {
                    from: 'users', // Lookup user details
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'sellerDetails',
                },
            },
            { $match: { 'sellerDetails.user_type': 'seller' } },
            { $count: 'totalSellerCommodities' },
        ]);

        const totalBuyerCommodities = await Commodity.aggregate([
            {
                $lookup: {
                    from: 'users', // Lookup user details
                    localField: 'createdBy',
                    foreignField: '_id',
                    as: 'buyerDetails',
                },
            },
            { $match: { 'buyerDetails.user_type': 'buyer' } },
            { $count: 'totalBuyerCommodities' },
        ]);

        res.status(200).json({
            totalSellerCommodities: totalSellerCommodities[0]?.totalSellerCommodities || 0,
            totalBuyerCommodities: totalBuyerCommodities[0]?.totalBuyerCommodities || 0,
        });
    } catch (error) {
        console.error('Error fetching dashboard counts:', error);
        res.status(500).json({ message: 'Failed to fetch dashboard counts', details: error.message });
    }
};
