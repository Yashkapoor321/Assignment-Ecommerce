const mongoose = require("mongoose");

const address = {
    addressLine1 : {
        type : String,
        required : true
    },
    addressLine2 : {
        type : String,
        required : false,
        default : "-"
    },
    city : {
        type : String,
        required : true,
    },
    state : {
        type : String,
        required : true
    },
    pinCode : {
        type : String,
        required : true
    },
    _id : false   //it will not generate another id for address in database 
} 

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    }, 
    lastName : {
        type : String,
        required : false,
        default : "-"
    },
    mobileNo : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true,
      },
    address: {
        type: address,
        required: true,
      },
      role: {
        type: String,
        required: true,
        enum: ["CUSTOMER", "SELLER", "ADMIN"],  // enum array contains options
      },
      token: {
        type: String,
        required: false,
        default: "",
      },
      wishlist: {                    // for Whishlist
        type: [mongoose.Types.ObjectId],   // objectId --> dataType taken from mongoose
        required: false,
        default: [],
        ref: "products",
      },
})

const UserModel = mongoose.model("users", userSchema) 

module.exports =  UserModel