//THIS is for connecting backend(express) with databse.

const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection to database successful");
        
    } catch (error) {
        console.error("Databas connection failed");
        process.exit(0);
    }
};

module.exports = connectDb;