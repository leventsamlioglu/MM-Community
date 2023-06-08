const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: [true, "Comment can not be empty!"],
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
