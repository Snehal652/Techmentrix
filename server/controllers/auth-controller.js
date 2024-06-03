const User = require("../models/user-model")
const brcypt = require("bcryptjs");


const home = async(req,res) => {
    try {
        res
            .status(200)
            .send("Welcome to page using router");
    } catch (error) {
        console.log(error);
    }
};

const register = async(req,res) =>
{
    try {
        //1. Retrieve the user data using req.body and destructure it
        const {username, email, phone, password} = req.body;
        
        //2. Then check if user with given email id already exists or not.This is done using .findOne() method in User model
        const userExist = await User.findOne({email});
        //If user exists then do the following:
        if(userExist) {
            return res.status(400).json({message: "email already exists"});
        }
    
        //Else if user does not exists then CREATE a new user using .create() method of User model with given attributes but before that hash the passowrd using brcyptjs
        //3. Hash the Password using bcryptjs
        //  const saltRound = 10;
        //  const hash_password = await brcypt.hash(password, saltRound);

        const userCreated = await User.create({username,email, phone, password,});
        
        //4. After successful registration , generate toke using JWT. Here we have used a function .generateToken() and this function is defined in user-model.In this function we use jwt.sign() method where we pass the payload and the signature that is used for verificiation.
        res
            .status(201)
            .json({
                msg: "registration successful",
                token: await userCreated.generateToken(), 
                userId: userCreated._id.toString(),
            });
    } catch (error) {
        res.status(500).json("internal server error"); 
    }
}


const login = async (req,res) => {
    try {
        //1. Retrieve and destructure the user data using req.body
        const {email, password} = req.body;
        //2. Check if user already exists or not using .findOne() method.
        const userExist = await User.findOne({email});

        if(!userExist) {
            return res.status(400).json({ message:"Invalid Credentials"});
        }

        // const user = await brcypt.compare(password, userExist.password);
        // Yeh jo uppar likha hai usko abhi controlller mein likha hai toh kyu nhi iske liye ek function banaye using instance methods jaise humne web token generate karne ke liye banaya tha(pre methods)

        //3. Compare password using .comparePassword() method. This function is defined in user-model. And in this function we bascially use bcrypt.compare() method.
        const user = await userExist.comparePassword(password);
        
        //4. After successfull login, we generate a token using JWT. Here we have used the same function used while regitration for generating token. This function is .generateToken() -> It is defined in user-model and it basically uses jwt.sign() method containing payload and the signature.
        if(user) {
            res
            .status(200)
            .json({
                msg: "Login successful",
                token: await userExist.generateToken(), 
                userId: userExist._id.toString(),
            });
        } else{
            res.status(401).json({message:"Invalid email or password"});
        }

    } catch (error) {
        // res.status(500).json("internal server error");
        next(error);
       
    }
}


//User logic -> for sending user data from backend to frontend
const user = async(req,res) => {
    try {
        const userData = req.user;
        console.log(userData);  
        return res.status(200).json({userData}); //THis is for passing data of user to frontend
        
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}


module.exports = {home,register,login,user};