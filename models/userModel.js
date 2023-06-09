const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// Hash password before save the user to DB
userSchema.pre("save", async function (next) {
	this.password = bcrypt.hashSync(this.password, 12);
	next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
