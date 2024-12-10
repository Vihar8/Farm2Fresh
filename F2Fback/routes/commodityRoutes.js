const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig'); // Path to multer configuration
const commodityController = require('../controllers/commodityController');

// Route to add a new commodity
router.post('/', upload.array('images', 2), commodityController.addCommodity);

// Route to get all commodities
router.get('/', commodityController.getCommodities);

module.exports = router;
