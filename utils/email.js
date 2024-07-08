const nodemailer = require("nodemailer")

const sendEmail = ({ to, subject, message }) => new Promise((resolve, reject) => {
    const mailer = nodemailer.createTransport({
        auth: { user: process.env.FROM_EMAIL, pass: process.env.EMAIL_PASS },
        service: "gmail"
    })

    mailer.sendMail({ to, subject, text: message, html: message }, (err) => {
        if (err) {
            console.log(err)
            reject(err.message || "unable to send email")
        }
        console.log("Email Send Success")
        resolve("Email Send Success")
    })
})

module.exports = sendEmail