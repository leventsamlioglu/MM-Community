const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please enter a username!"],
	},
	email: {
		type: String,
		required: [true, "Please enter an email!"],
	},
	password: {
		type: String,
		required: [true, "Please enter a password!"],
		minlength: [1, "Password length must be at least 6 character!"],
	},
});
  
const User = mongoose.model("user", userSchema);

module.exports = User;
