const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const jwt = require("jsonwebtoken");
const { generateMeta } = require("./openaiController");

const homePage = (req, res) => {
	Post.find()
		.populate("owner")
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render("homePage", { posts: result});
		})
		.catch((err) => console.log(err));
};

const postCreate = async (req, res) => {
	let postObj = {
		...req.body,
		answer: await generateMeta(req.body.question),
		owner: req.params.id,
	};
	console.log({postObj});
	const newPost = new Post(postObj);
	newPost
		.save()
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => {console.log( err.errors);
			res.redirect("/");}
		
		);
};

const postDetail = (req, res) => {
	
	Post.findById(req.params.id)
		.then((result1) => {
			Comment.find({ owner: req.params.id })
				.sort({ createdAt: -1 })
				.then((result2) => {
					const err={}
					res.render("details", { post: result1, comments: result2,err:err });
				})
				.catch((err) =>{res.render('details', {err: err.errors})});
			
		})
		.catch((err) => console.log(err));
};

const postDelete = (req, res) => {
	Post.findByIdAndDelete(req.params.id)
		.then(() => res.redirect("/"))
		.catch((err) => {
			console.log(err);
		});
};



const commentCreate = (req, res) => {
	let commentObj = {
		...req.body,
		owner: req.params.id,
		user: res.locals.username,
	};

	const newComment = new Comment(commentObj);
	newComment
		.save()
		.then((result) => {
			// res.render("details", { post: result });
			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
};

const commentDelete = (req, res) => {
	Comment.findByIdAndDelete(req.params.id)
		.then(() => res.redirect("/"))
		.catch((err) => {
			console.log(err);
		});
};
// Login & Sign Up

const signupGet = (req, res) => {

	res.render("signup",{ err: null });
};

const loginGet = (req, res) => {
	res.render("login", { error: null });
};

const signupPost = async (req, res) => {
	// Check if this user is already in the DB.
	let existedUser = await User.findOne({ email: req.body.email });

	

	if (existedUser) {
		res.render("login", {
			error: "user is exist"
		});
	} else {
		let user = new User(req.body);
		user
			.save()
			.then(() => {
				const userToken = jwt.sign({ user }, process.env.JWT_TEXT);
				res.cookie("userToken", userToken, { httpOnly: true });
				res.redirect("/");
			})
			.catch((err)=> {res.render('signup', {err: err.errors})});
	}
};

const loginPost = async (req, res) => {
	// Check if this user is already in the DB.
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const userToken = jwt.sign({ user }, process.env.JWT_TEXT);
		res.cookie("userToken", userToken, { httpOnly: true });
		res.redirect("/");
	} catch (error) {
		res.render("login", { error });
	}
};

const logoutGet = (req, res) => {
	res.clearCookie("userToken");
	res.redirect("/");
};


const getEditModelPage =(req,res)=> {
	Post.findById(req.params.id)	
		.then((result) => {
			res.render("editModal", { post: result });
		})
		.catch((err) => console.log(err));
}

const getUpdatePost = (req,res) => {
	Post.findByIdAndUpdate(req.params.id,req.body,{new: true})
	.then((result) => {
		Comment.find({ owner: req.params.id })
				.sort({ createdAt: -1 })
				.then((result2) => {
					const err={}
					res.render("editedDetails", { post: result, comments: result2,err:err }
				)})
		
				})
	.catch((err) =>{res.render('editedDetails', {err: err.errors})})
}


module.exports = {
	homePage,
	postCreate,
	postDetail,
	postDelete,
	commentCreate,
	commentDelete,
	signupGet,
	signupPost,
	loginGet,
	loginPost,
	logoutGet,
	getEditModelPage,
	getUpdatePost
};
