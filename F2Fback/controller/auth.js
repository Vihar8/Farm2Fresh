const userModel = require("../models/user");
const bcryptjs = require('bcryptjs')
const signup = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const existsUser = await userModel.findOne({email})
        if (existsUser){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const hasepassowrd = await bcryptjs.hashSync(password,10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        const user = new userModel({
            email,
            password:hasepassowrd,
            name,
            verificationCode
        })
        await user.save()
        return res.status(200).json({success:true,message:"User signup successfully",user})
    } catch (err) {
        console.log(err)
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

module.exports = signup;