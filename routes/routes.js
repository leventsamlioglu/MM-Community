const express = require("express");
const routes = express.Router();
const controllers = require("../controllers/controllers");
const auth = require("../middleware/authMiddleware");
const openaiController = require("../controllers/openaiController");

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

 routes.get("/editPost/:id", controllers.getEditModelPage);
routes.post("/postDelete/:id", controllers.postDelete);
routes.post("/updatePost/:id",controllers.getUpdatePost)

routes.post("/openai",openaiController.generateMeta)

module.exports = routes;
