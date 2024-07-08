const router = require("express").Router()

const authController = require("./../controller/auth.controller")

router

    .post("/register", authController.registerUser)
    .post("/login", authController.loginUser)
    .post("/logout", authController.logout)

module.exports = router