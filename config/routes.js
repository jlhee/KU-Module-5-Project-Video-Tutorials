// Packages
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");

// Constants
const jwtConfig = require("../config/config").jwt;

// Controllers
const home = require("../controllers/home");
const details = require("../controllers/details");
const register = require("../controllers/register");
const login = require("../controllers/login");
const create = require("../controllers/create");
const edit = require("../controllers/edit");

module.exports = (app) => {
	app.use((req, res, next) => {
		let user = req.cookies.user;
		if (user) {
			// a user is logged in
			let decodedJWT = jwt.verify(user, jwtConfig.secret);
			res.user = { id: decodedJWT.id, username: decodedJWT.username };
			res.loggedIn = true;
		} else {
			// no user logged in
			res.loggedIn = false;
		}

		let notify = req.cookies.notify;
		if (notify) {
			res.clearCookie("notify");
			res.notify = notify.type;
			res.message = notify.message;
		}

		next();
	});

	app.get("/", home);

	app.get("/details/:id", details);

	app.get("/register", register.get);
	app.post("/register", register.post);

	app.get("/login", login.get);
	app.post("/login", login.post);

	app.get("/logout", (req, res) => {
		res.clearCookie("user");
		res.cookie("notify", {
			type: "success",
			message: "Logout successful",
		});
		res.redirect("/");
	});

	app.get("/create/course", create.get);
	app.post("/create/course", create.post);

	app.get("/edit/course/:id", edit.get);
	app.post("/edit/course/:id", edit.post);

	app.post("/delete/course/:id", (req, res) => {
		// TODO
	});

	// app.get("*", (req, res) => {
	// 	let context = {};
	// 	res.show = "none";
	// 	if (res.user) {
	// 		context.loggedIn = true;
	// 	}
	// 	res.render("404", context);
	// });
};
