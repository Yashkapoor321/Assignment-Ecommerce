const UserModel = require("../models/userModel.js")

const addToWishlist = async (req, res) => {
    try {
    console.log(req.user._id);  //req.user -> get from authMiddleware this is user ID in database
        await UserModel.findByIdAndUpdate(req.user._id, {$push : {wishlist : req.body.productId}})
        res.json({
            success : true,
            message : "Product is successfully added to wishlist"
        })
    } catch (error) {
        console.log("add to wishList error", error);
    }
}

const removeFromWishlist = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(req.user._id, {$pull : {wishlist : req.body.productId}})
        res.json({
            success : true,
            message : "Product Successfully removed from Wishlist "
        })
    } catch (error) {
        console.log("remove from wishList error", error);
    }
}

const getWishlist = async (req, res) => {
    try {
     const wishlist = await UserModel.findById(req.user._id) 
    .populate("wishlist")
    .select("wishlist"); // it is targetting user.wishlist
  // console.log(wishlist);
    res.json({
    success: true,
    message: "List of Product in wishlist",
    results: wishlist,
  });
    } catch (error) {
        console.log("getWishlist error", error);
    }
}

const wishlistController = {
    addToWishlist,
    removeFromWishlist,
    getWishlist
}

module.exports = wishlistController