let bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const saltConfig = require("../config/config").saltRounds;
const User = require("../models/User");

module.exports = {
	get: function (req, res) {
		// TODO:
	},
	post: function (req, res) {
		// TODO:
	},
};

// module.exports = {
// 	get: function (req, res) {
// 		// If logged in: redirect to home. Else: show register page.
// 		let context = {};
// 		context.type = res.show;
// 		if (res.show != "none") {
// 			context.message = res.message;
// 		}
// 		if (!res.user) {
// 			res.render("register", context);
// 		} else {
// 			res.cookie("status", {
// 				type: "warning",
// 				message: "Already logged in",
// 			});
// 			res.redirect("/");
// 		}
// 	},
// 	post: function (req, res) {
// 		console.log(req.body);
// 		let username = req.body.username;
// 		let pass = req.body.password;
// 		let rePass = req.body.repeatPassword;
// 		let context = { username, pass };

// 		// username/password validation
// 		let { errors } = validationResult(req);
// 		User.find({ username: username }).then((users) => {
// 			if (users.length > 0) {
// 				context.type = "warning";
// 				context.message = "Sorry, Username is already taken.";
// 				res.render("register", context);
// 			} else if (errors.length > 0) {
// 				if (errors[0].param == "username") {
// 					context.type = "error";
// 					context.message =
// 						"Please make sure your username is at least 5 characters long, and only contains letters and numbers.";
// 				} else if (errors[0].param == "password") {
// 					context.type = "error";
// 					context.message =
// 						"Please make sure your password is at least 8 characters long, and only contains letters and numbers.";
// 				}
// 				console.log(errors);
// 				res.render("register", context);
// 			} else if (pass != rePass) {
// 				context.type = "error";
// 				context.message =
// 					"Please make sure your Re-Password matches your Password.";
// 				res.render("register", context);
// 			} else {
// 				// username/password are valid
// 				bcrypt.genSalt(saltConfig, (err, salt) => {
// 					bcrypt.hash(pass, salt, (err, hash) => {
// 						console.log(hash);
// 						// create new user in db
// 						new User({
// 							username,
// 							password: hash,
// 						})
// 							.save()
// 							.then((user) => {
// 								res.status(201); // 'created' status code
// 								console.log("User successfully created");
// 								// console.log(user);
// 								res.cookie("status", {
// 									type: "success",
// 									message:
// 										"User created! Please login below.",
// 								});
// 								res.redirect("/login");
// 							})
// 							.catch((err) => {
// 								console.log(err);
// 							});
// 					});
// 				});
// 			}
// 		});
// 	},
// };
