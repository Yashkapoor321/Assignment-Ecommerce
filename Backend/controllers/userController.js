const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModel = require("../models/userModel.js")

const signUP = async (req, res) => {
    // console.log(req.body);
    
    try {
        const { firstName, password, email, phone } = req.body;

        if (firstName[0] !== firstName[0].toUpperCase()) {
            return res.json({
             success : false,
             message : "First Name first letter must be capital letter"
        })
        }
         // Password Validation
    // const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!password) {
    //     return next(new Error('Please Enter a password'));
    // }else if(!passwordRegex.test(password)){
    //     return next(new Error('Password must be at least 8 characters long and include one special character, one uppercase letter, and one numeric character.'));
    // }
       
       const salt = bcrypt.genSaltSync(10)  

       const hashedPassword = bcrypt.hashSync(req.body.password, salt);
       console.log("plain text password", req.body.password);
       console.log("Hashed Password", hashedPassword);

      const newlyInsertedUser = await UserModel.create({
      ...req.body,
      password : hashedPassword,
      role: "CUSTOMER"
      })

    res.json({
        suceess : true,
        message : "You are succesfully signed up, please login to continue"
    })

    } catch (error) {
        console.log("sign up error", error);
    }
  
}



const login = async (req, res) => {
    try {
         //apply validations
    console.log(req.body);

    const user = await UserModel.findOne({email : req.body.email})
    //check user present or not in DB [OR]  user id correct or not
    if(!user){ 
      return res.status(400).json({
        success : false,
        message : "Invalid username or password"
      })
    }

     //check password correct or not
      console.log("DB Stored Password ", user.password);
      console.log("user entered password", req.body.password);

      const isPasswordSame = await bcrypt.compare(req.body.password, user.password)
      console.log(isPasswordSame);   //it give boolean 

     if(!isPasswordSame){ 
        return res.status(400).json({
            success : false,
            message : "Invalid username or password"
        })
     }

     const currentTimeInSeconds = Math.floor(new Date().getTime() /1000) //token login timing
     const expirtTimeInSeconds = currentTimeInSeconds + 3600  //Token expired in 1hr from login time

     //in jwtPayload place user Inoformation which is insensitive  and passed it to token variable and when token is generated which is encrypted which contains all information of jwtPayload but in encrypted form
     const jwtPayload = {   //Token Encoded
        userId : user._id,
        role : user.role,
        mobileNo : user.mobileNo,
        exp : expirtTimeInSeconds
     }

     const token = jwt.sign(jwtPayload, "MY_SECRET_KEY");

     await UserModel.findByIdAndUpdate(user._id, {$set : {token : token}}) //At the time of login it will update previous token 
  
    res.json({
        success : true,
        message : "You are successfully logged in",
        token: token
    })
    } 

    catch (error) {
       console.log("loogged in error", error); 
    }
  
}

const userController = {
    signUP,
    login
}

module.exports = userController