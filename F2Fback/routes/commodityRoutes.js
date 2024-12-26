const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig'); // Path to multer configuration
const commodityController = require('../controllers/commodityController');
const { authenticateUser } = require('../middlewares/authMiddleware');

// Route to get all commodities (including buyer and seller)
router.get('/', authenticateUser, commodityController.getCommodities);

// Route to add a new commodity
router.post('/commodities', authenticateUser, upload.array('images', 2), commodityController.addCommodity);

// Route to get all seller commodities (excluding the logged-in user's commodities)
router.get('/getSellerCommodities', authenticateUser, commodityController.getSellerCommodities);

// Route to get all buyer commodities
router.get('/getBuyerCommodities', authenticateUser, commodityController.getBuyerCommodities);

router.delete('/deleteCommodity/:id',authenticateUser, commodityController.deleteCommodity);


router.get("/commodities", authenticateUser, commodityController.getUserCommodities);
module.exports = router;
