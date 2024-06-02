require("dotenv").config(); //This is used to declare that we are going to use dotenv in our application 
const express = require('express');
const cors = require("cors"); //This is for handling error due to cors policy which arises when the host of the domains of frontend and backend are different. BAscially cors policy is a security policy by web browsers.
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router")
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");


//Tackle cors issue
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}
app.use(cors(corsOptions));
//Cors issue handled.

app.use(express.json()) //It is a middleware to tell our application that we will be using json.
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
//Define route for admin panel
app.use("/api/admin", adminRoute);
app.use(errorMiddleware); // It is a middleware to check if there is error or not. If there is error then it will throw error and connection will not be established. Isse add se karne se humaare app mein kahi bhi error aa rha hoga and we pass that in next() then woh display hojayega

const PORT = 5000;

//When connection to database is successful then only start the server.
connectDb().then(() => {
    app.listen(PORT, () =>
    {
        console.log(`server is running on PORT: ${PORT}`);
    });
})
