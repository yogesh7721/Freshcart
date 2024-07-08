const router = require("express").Router()
const adminController = require("../controller/admin.controller")


router
    .get("/users", adminController.getUsers)
    .post("/new-user", adminController.addUsers)
    .put("/update_user/:id", adminController.updateUser)
    .delete("/delete-user/:id", adminController.deleteUser)

    .get("/product", adminController.getAllProducts)
    .post("/add-product", adminController.addProducts)
    .put("/update-product/:id", adminController.updateProducts)
    .delete("/delete-product/:id", adminController.deleteProducts)

module.exports = router