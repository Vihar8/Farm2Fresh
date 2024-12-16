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
exports.getSellerCommodities = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; // The logged-in user's ID

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
          "seller._id": { $ne: loggedInUserId }, // Exclude the logged-in user
        },
      },
    ]);

    res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
  
  exports.getbuyercommodities = async (req, res) => {
    try {
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
              mobile: { $arrayElemAt: ["$buyerDetails.mobile", 0] }, // Add mobile field
            },
          },
        },
      ]);
  
      res.status(200).json(listings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  