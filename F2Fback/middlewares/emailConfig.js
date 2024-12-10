const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "harshitkapadia563@gmail.com",
        pass: "pnxj tpus ggef npvg",
    },
});

const sendEmail = async () => {
    try {
        const info = await transporter.sendMail({
            from: '"Farm2Fresh" <harshitkapadia563@gmail.com>', // sender address
            to: "farm02fresh@gmail.com, kapadiaharshit563@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        console.log(info)
    } catch (err) {
        console.log(err)
        return res.status(500).json({success:false,message:"internal server error"})
    }
}

sendEmail()