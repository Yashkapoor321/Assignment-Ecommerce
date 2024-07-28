const express = require("express")

const productController = require("../controllers/productController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const roleMiddleware = require("../middlewares/roleMiddleware.js");



const router = express.Router();

router.post("/create", authMiddleware, roleMiddleware(["SELLER", "ADMIN"]), productController.createProduct) //Only SELLER can create product

router.get("/list", authMiddleware,  productController.productList)

router.patch("/edit/:productId", authMiddleware, roleMiddleware(["SELLER", "ADMIN"]), productController.editProduct)//Only SELLER can Update product

router.delete("/delete/:productId", authMiddleware, roleMiddleware(["SELLER", "ADMIN"]), productController.deleteProduct)
// router.delete("/delete/:productId")

module.exports = router