const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller")
const authMiddleware = require("../middlewares/auth-middleware"); //This is for verifying the JSON token to find whether the user has logged in or not. That is, token user ke paas hai ya nhi.
const adminMiddleware = require("../middlewares/admin-middleware");


router.route('/users').get(authMiddleware,adminMiddleware, adminController.getAllUsers);
router.route('/contacts').get(authMiddleware,adminMiddleware,adminController.getAllContacts);
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById) 
router.route("/users/:id").get(authMiddleware, adminMiddleware, adminController.getUserById)
router.route("/users/update/:id").patch(authMiddleware, adminMiddleware, adminController.updateUserById);
router.route("/contacts/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteContactById) 
//authMiddleware is for checking whether the user is logged in or in other words whether the user has token or not
//adminMiddleware is for checking whether the user is admin or not.

module.exports = router;