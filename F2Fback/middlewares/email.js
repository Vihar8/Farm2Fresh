const sendVerification = async (email,) => {
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