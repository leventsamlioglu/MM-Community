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
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		}
	},
	{ timestamps: true }
);

const Post = mongoose.model('post',postSchema)

module.exports = Post