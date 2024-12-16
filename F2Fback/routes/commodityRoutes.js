const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig'); // Path to multer configuration
const commodityController = require('../controllers/commodityController');
const {authenticateUser} = require('../middlewares/authMiddleware')

// get all commodity in home page
router.get('/', authenticateUser, commodityController.getCommodities);
// Route to add a new commodity
router.post('/commodities', authenticateUser, upload.array('images', 2), commodityController.addCommodity);

// Route to get all commodities
router.get('/getSellerCommodities',  authenticateUser, commodityController.getSellerCommodities)
router.get('/getbuyercommodities', authenticateUser, commodityController.getbuyercommodities)
module.exports = router;
