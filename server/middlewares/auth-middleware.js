//Here we will verify the token whether the token is valid or not. If token is valid then user ka data get karke usko "req.user" mein pass karwa dunga.

const jwt = require("jsonwebtoken");
const User = require("../models/user-model")

const authMiddleware = async (req,res,next) => {
    const token = req.header("Authorization");
    //If you attempt to use an expired token then you will recieve a 401 error.
    if(!token) {
        return res.status(401).json({message: "Unauthorized HTTP, token not provided"});
    }
    
    //Assuming token is in the format "Bearer <jwtToken>", Removing the "Bearer" prefix.
    const jwtToken = token.replace("Bearer","").trim();
    console.log('token from auth Middleware', jwtToken)

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log(isVerified);
        const userData = await User.findOne({ email: isVerified.email}).select({
            password: 0,
        });
        console.log(userData);
  
        req.user = userData;
        req.token = token;
        req.userID = userData._id; 
        
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized. Invalid Token"});
        
    }

    

};

module.exports = authMiddleware;