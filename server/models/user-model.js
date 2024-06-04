const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        require: true,
    },
    email: {
        type:String,
        require: true,
    },
    phone: {
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    }

});

//Secure the password with the bcrypt using pre method
// Humaara controller, data ko database mein store karne se phele yeh pre wala method run hoga
// So this acts a middleware jaha data save karne se phele yeh function run hoga uske baad data save hoga database mein
// So pre method will ensure that data database mein save hone se phele it will run this function where we are hashing
userSchema.pre("save", async function() {
    // console.log("pre method", this);
    const user = this;

    //Find is the password is modified or not. If password is NOT modified then simple go to NEXT step i.e. save the data in database.
    if(!user.isModified("password")){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

//This is for comparing password while login.
userSchema.methods.comparePassword = async function (password) {
    return  bcrypt.compare(password, this.password);
};


// json web token. With the help of userSchema.methods you can create many functions out of which generateToken is one of them.
// This code generates a JWT containing the user's ID, email, and admin status, and signs it using a secret key stored in an environment variable. The token is set to expire after 30 days.
userSchema.methods.generateToken = async function () {
     try {
        return jwt.sign({
            //This is our Payload:  //payload: This is the data you want to include in the token. In this case, it includes userId, email, and isAdmin.
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            //Now we have to pass the signature
            process.env.JWT_SECRET_KEY,  //secretOrPrivateKey: This is the secret key used to sign the token. It should be kept secret as it's used to verify the authenticity of the token later.
            { 
                expiresIn: "30d", // Expire the token after 30 days automatically
            }
        );
        
     } catch (error) {
        console.log(error);
     }
};


//Define model based on above schema
const User = new mongoose.model("User", userSchema);
module.exports = User;