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

const sendcode = async (email, resetLink) => {
    try {
        const response = await transporter.sendMail({
            from: `"Farm2Fresh" <${process.env.EMAIL_USER}>`, // sender address
            to: email, // list of receivers
            subject: "Reset Your Password", // Subject line
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Your Password</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #ffffff;
                    }
                    .header {
                        text-align: center;
                        padding: 20px 0;
                        border-bottom: 2px solid #eee;
                    }
                    .logo {
                        width: 150px;
                        height: auto;
                    }
                    .content {
                        padding: 30px 20px;
                        color: #333333;
                    }
                    .button {
                        display: inline-block;
                        padding: 12px 30px;
                        margin: 20px 0;
                        background-color: #4CAF50;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        font-weight: bold;
                    }
                    .link-text {
                        word-break: break-all;
                        color: #666;
                        font-size: 14px;
                        margin: 15px 0;
                    }
                    .footer {
                        text-align: center;
                        padding: 20px;
                        color: #666;
                        font-size: 12px;
                        border-top: 1px solid #eee;
                    }
                    .warning {
                        background-color: #fff3cd;
                        border: 1px solid #ffeeba;
                        color: #856404;
                        padding: 12px;
                        border-radius: 4px;
                        margin: 20px 0;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <!-- Replace with your actual logo URL -->
                        <img src="https://i.ibb.co/vqpGhB6/F2f.jpg" alt="Farm2Fresh Logo" class="logo">
                    </div>
                    <div class="content">
                        <h2>Reset Your Password</h2>
                        <p>Hello,</p>
                        <p>We received a request to reset your password for your Farm2Fresh account. To proceed with the password reset, please click the button below:</p>
                        
                        <div style="text-align: center;">
                            <a href="${resetLink}" class="button">Reset Password</a>
                        </div>

                        <p class="link-text">If the button doesn't work, copy and paste this link into your browser:</p>
                        <p class="link-text">${resetLink}</p>

                        <div class="warning">
                            ⚠️ This link will expire in 15 minutes for security reasons.
                            If you didn't request this password reset, please ignore this email or contact support if you have concerns.
                        </div>

                        <p>Best regards,<br>The Farm2Fresh Team</p>
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} Farm2Fresh. All rights reserved.</p>
                        <p>This is an automated message, please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
            `
        });
        console.log("Password reset email sent successfully");
    } catch (err) {
        console.error("Password reset email error:", err);
    }
};

module.exports = {sendVerificationCode, sendcode};
