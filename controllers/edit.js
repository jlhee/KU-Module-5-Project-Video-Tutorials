const { validationResult } = require("express-validator");
const Course = require("../models/Course");

module.exports = {
	get: function (req, res) {
		let context = {
			loggedIn: true,
			username: res.user.username,
			notify: res.notify,
		};
		let courseID = req.params.id;
		let userID = res.user.id;

		Course.findById(courseID).then((course) => {
			if (userID == course.creator) {
				context = {
					...course.toJSON(),
					...context,
				};
				res.render("edit-course", context);
			} else {
				res.cookie("notify", {
					status: "error",
					message: "Cannot edit course created by another user",
				});
				res.status(403);
				res.redirect(`/details/${courseID}`);
			}
		});
	},
	post: function (req, res) {
		let courseID = req.params.id;
		let title = req.body.title.trim();
		let description = req.body.description.trim();
		let imgUrl = req.body.imgUrl.trim();
		let isPublic = Boolean(req.body.isPublic);
		let context = {
			_id: courseID,
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

		Course.findOne({ title: title })
			.then((course) => {
				if (course && course._id != courseID) {
					context.notify.status = "warning";
					context.notify.message = `"${title}" already exists`;
					res.status(400);
					res.render("edit-course", context);
				} else if (!errors.isEmpty()) {
					// validations failed
					// console.log(errors);
					context.notify.status = "error";
					context.notify.message =
						"Invalid fields - please address the following form requirement(s):";
					context.notify.msgArr = errors.errors;
					res.status(400);
					res.render("edit-course", context);
				} else {
					// validations passed
					Course.findById(courseID).then((course) => {
						course.title = title;
						course.description = description;
						course.imgUrl = imgUrl;
						course.isPublic = isPublic;
						course
							.save()
							.then((course) => {
								res.cookie("notify", {
									status: "success",
									message: "Course updated!",
								});
								res.status(200);
								res.redirect(`/details/${courseID}`);
							})
							.catch((err) => {
								res.status(500);
								console.log(err);
							});
					});
				}
			})
			.catch((err) => {
				res.status(500);
				console.log(err);
			});
	},
};
