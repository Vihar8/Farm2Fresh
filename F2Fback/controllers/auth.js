const sendVerificationCode = require("../middlewares/email");
const userModel = require("../models/user");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Signup Controller
const signup = async (req, res) => {
    try {
        const { email, password, name, role, user_type, mobile } = req.body; // Added mobile

        // Check if all fields are provided
        if (!email || !password || !name || !role || !user_type || !mobile) { // Added check for mobile
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if the role is valid (either 1 for client or 2 for admin)
        const validRoles = [1, 2]; // 1 = client, 2 = admin
        if (role && !validRoles.includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid role provided" });
        }

        // Check if the user_type is valid (either "buyer" or "seller")
        const validUserTypes = ['buyer', 'seller']; // buyer or seller
        if (!validUserTypes.includes(user_type)) {
            return res.status(400).json({ success: false, message: "Invalid user_type provided" });
        }

        // Default role to 1 (client) if not provided
        const userRole = role || 1;

        // Check if the user already exists
        const existsUser = await userModel.findOne({ email });
        if (existsUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Check if the mobile number already exists (optional)
        const existsMobile = await userModel.findOne({ mobile });
        if (existsMobile) {
            return res.status(400).json({ success: false, message: "Mobile number already registered" });
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
            role: userRole,
            user_type, // Add user_type to the user object
            mobile // Save mobile number
        });

        console.log(user);
        await user.save();

        // Send the verification email
        await sendVerificationCode(user.email, verificationCode);

        return res.status(201).json({ success: true, message: "User signed up successfully. Verification code sent to email." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Verify Email Controller (No change here)
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

// Login Controller (No change needed for mobile field)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email)
        console.log(password)

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Find user by email
        const user = await userModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user is verified
        if (!user.isVerified) {
            return res.status(403).json({ success: false, message: "User email is not verified" });
        }

        // Compare the password
        const isPasswordValid = bcryptjs.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '2h' } // Token expires in 2 hours
        );

        // Respond with the token and user details
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                mobile: user.mobile, // Include mobile in the response
                user_type: user.user_type
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get Profile Controller (No change needed for mobile)
const getProfile = async (req, res) => {
    try {
        // Access the user from the authenticated request (from the middleware)
        const user = req.user;

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                mobile: user.mobile,
                user_type: user.user_type
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    signup,
    verifyEmail,
    login,
    getProfile
};
