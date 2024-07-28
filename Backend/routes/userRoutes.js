const express = require("express")

const userController = require("../controllers/userController.js")

const router = express.Router()

router.post("/signup", userController.signUP)  // Register API

router.post("/login", userController.login)  //Login API


module.exports = router