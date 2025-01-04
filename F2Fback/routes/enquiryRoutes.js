const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

// Route to add a new enquiry
router.post('/', enquiryController.addEnquiry);

// Route to get all enquiries
router.get('/', enquiryController.getEnquiries);

router.delete('/delete/:id', enquiryController.deleteEnquiry);

module.exports = router;
