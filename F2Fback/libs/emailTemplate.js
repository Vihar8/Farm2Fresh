const otpTemplate = (name, otp) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
    <meta charset="UTF-8">
    <title>OTP Verification Email</title>
    <style>
    body {
    background-color: #2CB21A;
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.4;
    color: #333333;
    margin: 0;
    padding: 0;
    }
    
    .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    }
    
    .logo {
    max-width: 200px;
    margin-bottom: 20px;
    }
    
    .message {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
    }
    
    .body {
    font-size: 16px;
    margin-bottom: 20px;
    }
    
    .cta {
    display: inline-block;
    padding: 10px 20px;
    background-color: #2CB21A;
    color: #000000;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    margin-top: 20px;
    }
    
    .support {
    font-size: 14px;
    color: #999999;
    margin-top: 20px;
    }
    
   .highlight {
    font-weight: bold;
    background-color: #2CB21A;
    color: white;
    padding: 10px;
    display: inline-block;
    width: fit-content; 
}

    </style>
    
    </head>
    
    <body>
    <div class="container">
    <a href="https:Farm2Fresh//.vercel.app"><img class="logo"
    src="https://i.ibb.co/vqpGhB6/F2f.jpg" alt="Farm2Fresh Logo"></a>
    <div class="message">OTP Verification Email</div>
    <div class="body">
    <p>Dear ${name},</p>
    <p>Thank you for registering with Farm2Fresh. To complete your registration, please use the following OTP
    (One-Time Password) to verify your account:</p>
    <h2 class="highlight">${otp}</h2>
    <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
    Once your account is verified, you will have access to our platform and its features.</p>
    </div>
    <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
    href="mailto:info@Farm2Fresh.com">info@Farm2Fresh.com</a>. We are here to help!</div>
    </div>
    </body>
    
    </html>`;
};

module.exports = otpTemplate;