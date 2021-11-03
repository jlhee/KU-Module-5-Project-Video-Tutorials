const Course = require("../models/Course");
const User = require("../models/User");

module.exports = function (req, res) {
	let courseID = req.params.id;
	let userID = res.user.id;

	Course.findById(courseID)
		.then((course) => {
			if (course.creator == userID) {
				// error: user is course creator
				res.cookie("notify", {
					status: "warning",
					message: "Users cannot enroll in their own courses",
				});
				res.status(403);
				res.redirect(`/details/${courseID}`);
			} else if (course.users.includes(userID)) {
				// error: user is already enrolled
				res.cookie("notify", {
					status: "warning",
					message: "You're already enrolled in this course",
				});
				res.status(403);
				res.redirect(`/details/${courseID}`);
			} else {
				// user may enroll
				course.users.push(userID);
				course.save().then((course) => {
					User.findById(userID).then((user) => {
						user.courses.push(courseID);
						user.save()
							.then((user) => {
								res.status(200);
								res.cookie("notify", {
									status: "success",
									message: "Enrolled in course!",
								});
								res.redirect("/");
							})
							.catch((err) => {
								res.status(500);
								console.log(err);
							});
					});
				});
			}
		})
		.catch((err) => {
			res.status(500);
			console.log(err);
		});
};
