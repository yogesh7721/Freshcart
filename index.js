const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// 2 Middlewares
app.use(express.static("uploads"))
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true
}))

// 3 User Routes
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin", require("./routes/admin.routes"))

// 4 404 Routes
app.use("*", async (req, res) => {
    res.status(404).json({ message: "Resource Not Found" })
})

// 5 Error Handler Routes
app.use((error, req, res, next) => {
    res.status(500).json({ error: error.message || "Something went wrong" })
})
// 6 Start Server 
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})

