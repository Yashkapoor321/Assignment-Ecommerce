const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const authMiddleware = require("./middlewares/authMiddleware.js")
const userRoutes = require("./routes/userRoutes.js")
const productRoutes = require("./routes/productRoutes.js")
const wishlistRoutes = require("./routes/wishlistRoutes.js")
const orderRouts = require("./routes/orderRoutes.js")
//Env configuration
dotenv.config()

const app = express()

//Middlewares
app.use(express.json())

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("DB Connected Successfully"))
  .catch((err) => console.log("Error connecting DB", err));

//API Routes
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1", wishlistRoutes)
app.use("/api/v1", authMiddleware, orderRouts)

const PORT = 10000
app.listen(PORT, ()=> {
    console.log(`Server is up and running at port ${PORT}`)
})












