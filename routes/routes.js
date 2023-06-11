const express = require("express");
const routes = express.Router();
const controllers = require("../controllers/controllers");
const auth = require("../middleware/authMiddleware");

routes.get("/",auth.checkUserToken, controllers.homePage);

routes.post("/", auth.checkUserToken, controllers.postCreate);

routes.get("/posts/create/", controllers.postDetail);

// Login & Sign Up
routes.get("/signup", auth.checkToken, controllers.signupGet);

routes.post("/signup", controllers.signupPost);

routes.get("/login", controllers.loginGet);

routes.post("/login", controllers.loginPost);

// Logout

routes.get("/logout", controllers.logoutGet);

module.exports = routes;