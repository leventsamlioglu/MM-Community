const jwt = require("jsonwebtoken");

const checkTokenHome = (req, res, next) => {
	const isToken = req.cookies.userToken;

	if (!isToken) {
		res.locals.user = null;
		res.locals.userId = null;
		next();
	} else {
		jwt.verify(isToken, process.env.JWT_TEXT, async (err, userInfo) => {
			if (err) {
				console.log(err);
			} else {
				res.locals.user = userInfo.user.username;
				res.locals.userId = userInfo.user._id;
				next();
			}
		});
	}
};

const checkTokenPage = (req, res, next) => {
	const isToken = req.cookies.userToken;

	if (isToken) {
		jwt.verify(isToken, process.env.JWT_TEXT, async (err, userInfo) => {
			if (err) {
				console.log(err);
			} else {
				res.locals.userId = userInfo.user._id;
				res.locals.username = userInfo.user.username;
				next();
			}
		});
	} else {
		res.locals.user = false;
		res.redirect("signup");
	}
};

module.exports = { checkTokenHome, checkTokenPage };
