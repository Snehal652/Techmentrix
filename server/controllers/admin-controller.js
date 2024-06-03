const User = require("../models/user-model"); //This is used for getting all the users data;
const Contact = require("../models/contact-model");

const getAllUsers = async(req,res) => {
    try {
        const users = await User.find({}, {password:0}); //.find() method is used for getting all the data from database. So User.find() will give us all the data. And {password:0} means that we don't want to fetch and display the password.
        console.log(users);
        if(!users || users.length===0) {
            return res.status(404).json({message: "No Users Found"});
        }
        return res.status(200).json(users);

    } catch (error) {
        next(error);
    }
}

const getAllContacts = async(req,res) => {
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length===0) {
            return res.status(404).json({message: "No Contacts Found"});
        }
        return res.status(200).json(contacts);
        
    } catch (error) {
        next(error);
    }
}

//DELETING USER Logic
const deleteUserById = async(req,res) => {
    try {
        const id = req.params.id; //This Line is used for getting the id of the user
        await User.deleteOne({ _id: id}); //This line will delete the user if the user's id matches with the id that we want to delete.
        return res.status(200).json({message: "User Deleted Successfully"})
    } catch (error) {
        next(error);
    }
}

//GETTING SINGLE USER DATA Logic
const getUserById = async(req,res) => {
    try {
        const id = req.params.id; //This Line is used for getting the id of the user
        const data = await User.findOne({ _id: id}, {password:0}); //This line will get the user data if the user's id matches with the id that we want to get. {password:0} means that we want to get the user data except its password.
        return res.status(200).json(data)
    } catch (error) {
        next(error);
    }
}

//User Update Logic
const updateUserById = async(req,res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;

        const updatedData = await User.updateOne({ _id:id}, {$set: updatedUserData},);
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}

//Deleting Contact logic
const deleteContactById = async(req,res) => {
    try {
        const id = req.params.id; //This Line is used for getting the id of the user
        await Contact.deleteOne({ _id: id}); //This line will delete the user if the user's id matches with the id that we want to delete.
        return res.status(200).json({message: "Contact Deleted Successfully"})
    } catch (error) {
        next(error);
    }
}

module.exports = {getAllUsers,getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById}; 