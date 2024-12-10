const sendVerificationCode = require("../middlewares/email");
const userModel = require("../models/user");
const bcryptjs = require('bcryptjs');

// Signup Controller
const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if all fields are provided
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if the user already exists
        const existsUser = await userModel.findOne({ email });
        if (existsUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Generate a verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes expiry time

        // Create a new user
        const user = new userModel({
            email,
            password: hashedPassword,
            name,
            verificationCode,
            verificationTokenExpiresAt,
            isVerified: false,
        });

        await user.save();

        // Send the verification email
        await sendVerificationCode(user.email, verificationCode);

        return res.status(201).json({ success: true, message: "User signed up successfully. Verification code sent to email." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Verify Email Controller
const verifyEmail = async (req, res) => {
    try {
        const { code } = req.body;
        
        // Log the received code for debugging
        console.log("Received verification code:", code);

        // Find user with matching code and non-expired token
        const user = await userModel.findOne({
            verificationCode: code,
        });

        if (!user) {
            console.log("No matching user found or code expired.");
            return res.status(400).json({ success: false, message: "Invalid or expired code" });
        }

        // Update user to mark as verified
        user.isVerified = true;
        user.verificationCode = undefined;

        await user.save();

        return res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


module.exports = {
    signup,
    verifyEmail,
};
