const { validationResult } = require("express-validator");
const Course = require("../models/Course");

module.exports = {
	get: function (req, res) {
		let context = {
			loggedIn: true,
			username: res.user.username,
			notify: res.notify,
		};

		res.render("create-course", context);
	},
	post: function (req, res) {
		console.log("Creating course...");

		let title = req.body.title.trim();
		let description = req.body.description.trim();
		let imgUrl = req.body.imgUrl.trim();
		let isPublic = Boolean(req.body.isPublic);
		let context = {
			title,
			description,
			imgUrl,
			isPublic,
			username: res.user.username,
			loggedIn: true,
			notify: {},
		};

		let errors = validationResult(req);
		// console.log(errors);

		Course.findOne({ title: title }).then((course) => {
			if (course) {
				context.notify.status = "warning";
				context.notify.message = `"${title}" already exists`;
				res.render("create-course", context);
			} else if (!errors.isEmpty()) {
				// validations failed
				console.log(errors);
				res.status(400);
				context.notify.status = "error";
				context.notify.message =
					"Invalid fields - please address the following requirements:";
				context.notify.msgArr = errors.errors;
				res.render("create-course", context);
			} else {
				// validations passed
				new Course({
					title,
					description,
					imgUrl,
					isPublic,
					creator: res.user.id,
				})
					.save()
					.then((course) => {
						// console.log(course);
						res.status(201);
						res.cookie("notify", {
							status: "success",
							message: "Course created!",
						});
						res.redirect("/");
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
	},
};
