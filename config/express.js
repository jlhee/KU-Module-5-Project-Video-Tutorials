const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const url = require("url");
// const querystring = require("querystring");

module.exports = (app) => {
	//TODO: Setup the view engine
	app.engine(
		"hbs",
		handlebars({
			extname: "hbs",
		})
	);
	app.set("view engine", "hbs");
	// Set up the body parser
	app.use(bodyParser.urlencoded({ extended: true }));
	// Set up the static files
	app.use(express.static("static"));
	app.use("/static", express.static("static"));
	app.use("/static", express.static(__dirname + "/static"));
	// Set up cookie parser
	app.use(cookieParser());
};
