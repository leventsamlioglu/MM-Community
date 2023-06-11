const express = require("express");
const routes = express.Router();
const controllers = require("../controllers/controllers");
const auth = require("../middleware/authMiddleware");

routes.get("/", auth.checkTokenHome, controllers.homePage);

routes.post("/sendPost/:id", auth.checkTokenPage, controllers.postCreate);

routes.get("/posts/create/:id", auth.checkTokenPage, controllers.postDetail);

routes.post(
	"/comments/create/:id",
	auth.checkTokenPage,
	controllers.commentCreate
);

routes.post("/comments/delete/:id",controllers.commentDelete)

// Login & Sign Up
routes.get("/signup", controllers.signupGet);

routes.post("/signup", controllers.signupPost);

routes.get("/login", controllers.loginGet);

routes.post("/login", controllers.loginPost);

// Logout

routes.get("/logout", controllers.logoutGet);

//editPost

// routes.post("/editPost", controllers.loginPost);
routes.post("/postDelete/:id", controllers.postDelete);

module.exports = routes;
