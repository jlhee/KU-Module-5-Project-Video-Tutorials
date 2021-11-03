let bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const saltConfig = require("../config/config").saltRounds;
const User = require("../models/User");

module.exports = {
	get: function (req, res) {
		let context = {
			loggedIn: false,
			notify: res.notify,
		};
		res.render("register", context);
	},
	post: function (req, res) {
		let username = req.body.username;
		let pass = req.body.password;
		let rePass = req.body.repeatPassword;

		let context = { username, pass, notify: {} };

		// form validations
		let errors = validationResult(req);
		// console.log(errors);

		User.findOne({ username: username }).then((user) => {
			if (user) {
				// username is not unique
				context.notify.status = "warning";
				context.notify.message = "Sorry, that username already exists";
				res.status(409);
				res.render("register", context);
			} else if (!errors.isEmpty()) {
				// validations failed
				context.notify.status = "error";
				context.notify.message =
					"Please address the following username/password requirements:";
				context.notify.msgArr = errors.errors;
				res.status(400);
				res.render("register", context);
			} else if (pass != rePass) {
				// repeat password doesn't match
				context.notify.status = "error";
				context.notify.message =
					"Repeat-Password does not match Password";
				res.status(400);
				res.render("register", context);
			} else {
				// validations passed
				bcrypt.genSalt(saltConfig, (err, salt) => {
					bcrypt.hash(pass, salt, (err, hash) => {
						new User({
							username,
							password: hash,
						})
							.save()
							.then((user) => {
								// console.log(user);
								res.cookie("notify", {
									status: "success",
									message:
										"New user created! Please login below.",
								});
								res.status(201);
								res.redirect("/login");
							})
							.catch((err) => {
								res.status(500);
								console.log(err);
							});
					});
				});
			}
		});
	},
};
