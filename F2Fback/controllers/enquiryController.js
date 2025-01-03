const Enquiry = require('../models/enquiryform');

// Controller to add a new enquiry
exports.addEnquiry = async (req, res) => {
    try {
        const { email, mobile, requirement } = req.body;

        if (!email || !mobile || !requirement) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newEnquiry = new Enquiry({ email, mobile, requirement });
        await newEnquiry.save();

        res.status(201).json({ message: "Enquiry submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong!", details: error.message });
    }
};

// Controller to get all enquiries
exports.getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find();
        res.status(200).json(enquiries);
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch enquiries.", details: error.message });
    }
};


// Controller to delete an enquiry by ID
exports.deleteEnquiry = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Enquiry ID is required" });
        }

        const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

        if (!deletedEnquiry) {
            return res.status(404).json({ error: "Enquiry not found" });
        }

        res.status(200).json({ message: "Enquiry deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Unable to delete enquiry.", details: error.message });
    }
};
