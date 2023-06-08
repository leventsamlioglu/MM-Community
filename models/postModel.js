const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
		},
		title:{
			type:String,
			required: true,
		},
		comment:{
			type: Array,
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model('post',postSchema)

module.exports = Post