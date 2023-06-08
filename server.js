const express = require("express");
const exportedRoutes = require("./routes/routes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const dbURI = process.env.URI;

mongoose
	.connect(dbURI)
	.then(() => {
		console.log("Successfully connected to DB!");
		app.listen(3000);
	})
	.catch((err) => console.log(err));

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(exportedRoutes);
