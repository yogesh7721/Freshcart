
const asyncHandler = require("express-async-handler")
const Users = require("../models/Users")
const upload = require("../utils/upload")
const Product = require("../models/Product")

exports.getUsers = asyncHandler(async (req, res) => {
    const result = await Users.find({ role: "customer" })
    res.json({ message: "User Fetch Success", result })
})
exports.addUsers = asyncHandler(async (req, res) => {
    await Users.create({ ...req.body, role: "customer" })
    res.json({ message: "User create  Success" })
})
exports.updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Users.findByIdAndUpdate(id, req.body)
    res.json({ message: "User Update Successs" })
})
exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Users.findByIdAndDelete(id)
    res.json({ message: "User delete success" })
})

/////

exports.getAllProducts = asyncHandler(async (req, res) => {
    const result = await Product.find()
    res.json({ message: "product fetch success", result })
})


exports.addProducts = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(404).json({ message: "Multer Error", err })
        }
        if (req.file) {
            await Product.create({ ...req.body, image: req.file.filename })
            res.json({ message: "Product Add success" })
        } else {
            return res.status(404).json({ message: "Thumb Image Is Required" })
        }
    })
})

exports.updateProducts = asyncHandler(async (req, res) => {
    // const { id } = req.params
    await Product.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "update product success" })
})
exports.deleteProducts = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "delete product success" })
})
