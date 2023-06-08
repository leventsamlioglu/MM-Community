const express = require("express");
const routes = express.Router();
const controllers = require("../controllers/controllers");


routes.get("/", controllers.homePage);

routes.post('/', controllers.postCreate)

routes.get("/posts/create/", controllers.postDetail);

// Login & Sign Up
routes.get('/signup', controllers.signupGet);

routes.get('/login', controllers.loginGet);

// Logout

routes.get('/logout', controllers.logoutGet)


module.exports = routes;
