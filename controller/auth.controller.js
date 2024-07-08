const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// const Users = require("../models/Users")
const sendEmail = require("../utils/email")
const Users = require("../models/Users")

exports.registerUser = asyncHandler(async (req, res) => {
    const { password, email } = req.body
    const isFound = await Users.findOne({ email })
    if (isFound) {
        return res.status(400).json({ message: "Email Already Exist" })
    }
    const hashPass = await bcrypt.hash(password, 10)
    await Users.create({ ...req.body, password: hashPass, role: "customer" })
    // Send Email
    await sendEmail({
        to: email,
        subject: "Registration Success",
        message: `<h1>Welcome, ${req.body.name}.</h1>`
    })
    res.json({ message: `${req.body.name} Register Success` })
})

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // 1 verify Email
    const result = await Users.findOne({ email })
    if (!result) {
        return res.status(400).json({ message: "Email Not Found" })
    }

    // 2 verity password
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(400).json({ message: "Password Do Not Match" })
    }

    // 3 generate Token
    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "6h" })

    // 4 send Token With Cookies
    res.cookie("auth-token", token, { httpOnly: true })

    res.json({
        message: "login Success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            role: result.role,
        }
    })
})

exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie("auth-token")
    res.json({ message: "logout success" })
})

