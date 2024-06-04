const {Schema , model} = require("mongoose"); //Yahapar humne schema aur model ko phele hi destructure karliya hai so we don't need to write new mongoose.schema we can directly write new Schema

//Create a new schema for Contact form
const contactSchema = new Schema({
    username: { type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
});

//Create a model or a collection
const Contact = new model("Contact", contactSchema);
module.exports = Contact;

