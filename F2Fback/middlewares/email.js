const otpTemplate = require('../libs/emailTemplate');
const transporter = require('./emailConfig');

const sendVerificationCode = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"Farm2Fresh" <harshitkapadia563@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Verify your email", // Subject line
            text: 'To verify your email, your code is', // plain text body
            html: otpTemplate(verificationCode), // html body
        });
        console.log("Email sent successfully");
    } catch (err) {
        console.log("Email error:", err);
    }
};

module.exports = sendVerificationCode;
