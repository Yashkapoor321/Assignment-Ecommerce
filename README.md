# Ecommerce Application API

### Base URL for all API Request

https://ecommerce-application-zu2l.onrender.com


### SignUp API
https://ecommerce-application-zu2l.onrender.com/api/v1/user/signup
**Signup Format**
``` 
{
    "firstName" : "ABCD",
    "lastName" : "SE",
    "mobileNo" : "7684682227",
     "email" : "yash87@gmail.com", 
    "password" : "1234@hghgjY",
    "address" : {
    "addressLine1" : "jXN ,HASJHS",
     "city" : "XYZ",
     "state"  : "Maharashtra",
     "pinCode"  :  "666826"
    },
    "role" : "CUSTOMER"
}
```

### Login  API
https://ecommerce-application-zu2l.onrender.com/api/v1/user/login
**Login Format**
```
{  
 "email" :"yash87@gmail.com",
 "password" : "1234@hghgjY" 
}
```
After login token will generate and token will expired after 1 hour from the time of login. This token will help to access all API's. After token expired re-login

```
{
    "success": true,
    "message": "You are successfully logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmE2YTE5M2EyNGM1Mzg0ZmE5NjlhOTciLCJyb2xlIjoiQ1VTVE9NRVIiLCJtb2JpbGVObyI6Ijc2ODQ2ODIyMjciLCJleHAiOjE3MjIyMDEwMzEsImlhdCI6MTcyMjE5NzQzMX0.cQI4m3uCn-7kc53pI27GS4aUP71uUl0wlXle3YTKNGk"
}
```


### Product Create API
https://ecommerce-application-zu2l.onrender.com/api/v1/product/create
**Format**
```
  {
      "title": "iPhone X",
      "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      "price": 899,
      "discountPercentage": 17.94,
      "rating": 4.44,
      "stock": 34,
      "brand": "Apple",
      "category": "smartphones",
      "thumbnail": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
      "images": [
        "https://cdn.dummyjson.com/product-images/2/1.jpg",
        "https://cdn.dummyjson.com/product-images/2/2.jpg",
        "https://cdn.dummyjson.com/product-images/2/3.jpg",
        "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
      ]
    }
```

### Product Read API
https://ecommerce-application-zu2l.onrender.com/api/v1/product/list
Click on URL to read Product


### Product update API
https://ecommerce-application-zu2l.onrender.com/api/v1/product/edit/:productId
**Format**
```
{
    "title" : "iPhone X Updated"  
}
```

### Product Delete API
https://ecommerce-application-zu2l.onrender.com/api/v1/product/delete/:productId
At the place of **:productId** place actual product id. To get actual productId fist go to Product read API and get the productId 

### Order Product
https://ecommerce-application-zu2l.onrender.com/api/v1/order
**Format**
```
{
  "items" : [
   {
     "product" : "66a4977922712a4ea2a9ec9b",
     "qty" :3
   }, 
   {
     "product" : "66a4977922712a4ea2a9ec9d",
     "qty" : 2
   }
  ],
  "deliveyAddress" : 
    {
      "addressLine" : "dsjb 66",
      "city" : "deoli",
      "state" : "MH",
      "pincode" : "7876"
    },
   "modeOPayment" : "COD"
}
```

### Add Product in Wishlist 
https://ecommerce-application-zu2l.onrender.com/api/v1/wishlist/add
**Format**
```
{
    "productId" : "66a4977922712a4ea2a9ecad"
}
```

### Remove Product from Wishlist 
https://ecommerce-application-zu2l.onrender.com/api/v1/wishlist/remove
**Format**
```
{
    "productId" : "66a4977922712a4ea2a9ecad"
}
```

### Read wishlist
https://ecommerce-application-zu2l.onrender.com/api/v1/wishlist
For reading wishlist click on URL

