const ProductModel = require("../models/productModel")


const createProduct = async (req, res) => {
    try {
        //apply validation
        const newlyInsertedProduct = await ProductModel.create(req.body)
        
        res.json({
            success : true,
            message : "Product inserted successfully in database",
            result : newlyInsertedProduct._id
        })
        
    } catch (error) {
         console.log("create product error", error);
    }
}

const productList = async(req, res) => {
   try {
    const pageSize = req.query.pageSize;
    const pageNo = req.query.pageNo;
    const minPrice = req.query.minPrice || 0;   
    const sortProduct = req.query.sort === "Ascending" ? 1 : -1;  // 1 Ascending  & -1 descending
    const listOfProduct = await ProductModel.find({
        price : {$gt: minPrice},
        isActive :  true         // It will show all active item
    })
    .sort({price : sortProduct}) //sort on the basis of price
    .limit(pageSize)
    .skip((pageNo -1) * pageSize)
    res.json({
        success : true,
        message : "List of product",
        result : listOfProduct
    })
   } catch (error) {
    console.log("list of product error", error);
   }
}

const editProduct = async (req, res) => {
    try {
     const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.productId, { $set : req.body} )
     console.log(updatedProduct);
     res.json({
        success : true,
        message : "product updated successfully",
        result : updatedProduct
     })
    } catch (error) {
       console.log("editProduct error", error); 
    }
}

const deleteProduct = async (req, res) => {
    try {
        // await ProductModel.findByIdAndDelete(req.params.productId)  // Data never delete that's why it is not use
        await ProductModel.findByIdAndUpdate(req.params.productId, {$set : {isActive : false}})
        res.json({
            success : true,
            message : "product deleted successfully"
        })
    } catch (error) {
        console.log("product delete error", error);
    }
}

const productController = {
    createProduct,
    productList,
    editProduct,
    deleteProduct
}

module.exports = productController