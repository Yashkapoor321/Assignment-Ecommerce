const express = require("express")

const wishlistController = require("../controllers/wishListController.js")
const authMiddleware = require("../middlewares/authMiddleware.js")

const router = express.Router();

router.post("/wishlist/add", authMiddleware, wishlistController.addToWishlist);

router.post("/wishlist/remove", authMiddleware, wishlistController.removeFromWishlist)

router.get("/wishlist", authMiddleware, wishlistController.getWishlist)

module.exports = router
