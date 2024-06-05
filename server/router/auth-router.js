const express = require('express');
const router = express.Router(); 
const authcontrollers = require("../controllers/auth-controller.js");
const {signupSchema, loginSchema} = require("../validators/auth-validator.js");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware")

router.route("/"). get(authcontrollers.home);
router.route("/register"). post(validate(signupSchema),authcontrollers.register); //validate() is our middleware. Jab bhi hum /register route par call karenge tab sabse phele hum check kar rhe ki kya woh humaare zod schema se milta hai ya nhi. If all good then it will go to registration waala logic.
router.route("/login"). post(validate(loginSchema), authcontrollers.login);
router.route("/user").get(authMiddleware, authcontrollers.user); //This is for getting the data of user from backend i.e jab bhi koi "/user" route par visit karega usko user ka data frontend mein mil jaayega 
//authMiddleware is for checking ki whether the user has the token or not. In other words whether the user is logged in or not.

module.exports = router;    