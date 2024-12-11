const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig'); // Path to multer configuration
const commodityController = require('../controllers/commodityController');
const {authenticateUser} = require('../middlewares/authMiddleware')
// Route to add a new commodity
router.post('/', authenticateUser, upload.array('images', 2), commodityController.addCommodity);

// Route to get all commodities
router.get('/', authenticateUser, commodityController.getCommodities);

module.exports = router;
