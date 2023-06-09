const Post = require("../models/postModel");
const User = require("../models/userModel");

const homePage = (req, res) => {
	Post.find()
		.populate("owner")
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render("homePage", { posts: result });
		})
		.catch((err) => console.log(err));
};

const postCreate = (req, res) => {
	console.log(req.params.id);
	let postObj = {
		...req.body,
		owner: req.params.id,
	};
	const newPost = new Post(postObj);
	newPost
		.save()
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
};

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

const signupPost = async (req, res) => {
	// Check if this user is already in the DB.
	let existedUser = await User.findOne({ email: req.body.email });

	if (existedUser) {
		res.render("login", {
			error: "user is exist",
		});
	} else {
		let newUser = new User(req.body);
		newUser
			.save()
			.then(() => {
				res.redirect("/");
			})
			.catch((err) => {
				throw err;
			});
	}
};

const loginPost = async (req, res) => {};

const logoutGet = (req, res) => {};

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
