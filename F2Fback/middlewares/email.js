const otpTemplate = require('../libs/emailTemplate');
const transporter = require('./emailConfig');

const sendVerificationCode = async (email, verificationCode, name) => {
    try {
        const response = await transporter.sendMail({
            from: '"Farm2Fresh" <' + process.env.EMAIL_USER + '>', // sender address
            to: email, // list of receivers
            subject: "Verify your email", // Subject line
            text: 'To verify your email, your code is', // plain text body
            html: otpTemplate(name, verificationCode), // html body
        });
        console.log("Email sent successfully");
    } catch (err) {
        console.log("Email error:", err);
    }
};

module.exports = sendVerificationCode;
