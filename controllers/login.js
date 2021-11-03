const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/config").jwt;
const User = require("../models/User");

module.exports = {
	get: function (req, res) {
		let context = {
			loggedIn: false,
			notify: res.notify,
		};
		res.render("login", context);
	},
	post: function (req, res) {
		let username = req.body.username;
		let pass = req.body.password;
		let context = {
			username,
			notify: {},
		};

		User.findOne({ username })
			.then((user) => {
				if (user !== null) {
					// valid username
					bcrypt.compare(pass, user.password, (err, result) => {
						if (result) {
							// password accepted
							let userToken = {
								id: user._id,
								username: user.username,
							};
							const token = jwt.sign(
								userToken,
								jwtConfig.secret,
								jwtConfig.options
							);
							// console.log(token);
							res.cookie("user", token);
							res.cookie("notify", {
								status: "success",
								message: "Login successful!",
							});
							res.status(200);
							res.redirect("/");
						} else {
							// bad password
							context.notify.status = "error";
							context.notify.message = "Incorrect password";
							res.status(401);
							res.render("login", context);
						}
					});
				} else {
					// bad username
					context.notify.status = "warning";
					context.notify.message = "Username does not exist";
					res.status(401);
					res.render("login", context);
				}
			})
			.catch((err) => {
				res.status(500);
				console.log(err);
			});
	},
};
