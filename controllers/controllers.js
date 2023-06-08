const Post = require("../models/postModel");

const homePage = (req, res) => {
	Post.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render("index", { posts: result});
		})
		.catch((err) => console.log(err));
};

const postCreate = (req, res) => {};

const postDetail = (req, res) => {
	res.render("details");
};

const postDelete = (req, res) => {};

const postEdit = (req, res) => {};

const commentCreate = (req, res) => {};

// Login & Sign Up

const signupGet = (req, res) => {
	res.render("signup");
};

const loginGet = (req, res) => {
	res.render("login");
};

const signupPost = async (req, res) => {};

const loginPost = async (req, res) => {};

const logoutGet = (req, res) => {

};

module.exports = {
	homePage,
	postCreate,
	postDetail,
	postDelete,
	postEdit,
	commentCreate,
	signupGet,
	signupPost,
	loginGet,
	loginPost,
	logoutGet,
};
