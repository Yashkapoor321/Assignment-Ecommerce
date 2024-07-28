const OrderModel = require("../models/orderModel.js")
const ProductModel = require("../models/productModel.js")

const placeOrder = async (req, res) => {
   try {
//  console.log("Complete information of OrderModel", req.body);

   const productId = req.body.items.map((argument) => argument.product)
 console.log("Id of product getting", productId);
  const productList = await ProductModel.find({_id : productId})
console.log("it give array of productList with productDetails", productList);

// 1 Check items are in Stock
const areItemsInStock = req.body.items.every((par) => {
   return productList.find((product) => product._id == par.product).stock >= par.qty
})
console.log(areItemsInStock);  // true or false

if(!areItemsInStock){
    res.status(400).json({
        success : false,
        message : "Product are out of stock" 
    })
}
// Total Amount pay
let totalAmountToPay = productList.reduce((total, productArg) => {
    const productQuntity = req.body.items.find((par)=>par.product == productArg._id).qty
    return total + productArg.price * productQuntity
}, 0)

if(totalAmountToPay < 499){
    totalAmountToPay += 40   // 40 Rs delivery charges
}
console.log("totalAmountToPay", totalAmountToPay);

// Order Details
const orderDetails = {
    items: req.body.items,
    totalAmount: totalAmountToPay,
    deliveryAddress: req.body.deliveryAddress,
    billingAddress: req.body.deliveryAddress, // Same as delivery address
    modeOfPayment: req.body.modeOfPayment,
    orderStatus: "PENDING",
    user: req.user._id,
  };

  const { _id } = await OrderModel.create(orderDetails);

  // Reduce stock from ProductModel 
  req.body.items.forEach(async (product) => {
    await ProductModel.findByIdAndUpdate(product.product, {
      $inc: { stock: -product.qty },
    });
  });
  
    res.json({
        status : true,
        message : "Your order is successfully placed"
    })
   } catch (error) {
    console.log("Order placed error", error);
   }
}


const orderController = {
    placeOrder
}

module.exports = orderController