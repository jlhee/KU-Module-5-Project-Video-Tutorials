const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/config").jwt;
const User = require("../models/User");

module.exports = {
	get: function (req, res) {
		res.render("login");
		// let context = {};
		// context.type = res.show;
		// if (res.show != "none") {
		// 	context.message = res.message;
		// }
		// if (!res.user) {
		// 	// check status and context of page
		// 	res.render("login", context);
		// } else {
		// 	res.cookie("status", {
		// 		type: "warning",
		// 		message: "Already logged in",
		// 	});
		// 	res.redirect("/");
		// }
	},
	post: function (req, res) {
		let username = req.body.username;
		let pass = req.body.password;
		let context = { username };

		User.findOne({ username })
			.then((user) => {
				console.log(user);
				if (user !== null) {
					// valid username
					bcrypt.compare(pass, user.password, (err, result) => {
						if (result) {
							// password accepted
							res.status(200);

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
								type: "success",
								message: "Login successful!",
							});
							res.redirect("/");
						} else {
							// bad password
							res.status(401);
							context.notify = "error";
							context.message = "Incorrect password";
							res.render("login", context);
						}
					});
				} else {
					// bad username
					res.status(401);
					// context.type = "warning";
					// context.message = "Username does not exist";
					res.render("login", context);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	},
};
