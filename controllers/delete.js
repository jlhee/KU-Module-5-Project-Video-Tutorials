const Course = require("../models/Course");
const User = require("../models/User");

module.exports = function (req, res) {
	let courseID = req.params.id;
	let user = res.user;

	Course.findById(courseID).then((course) => {
		if (user.id == course.creator) {
			console.log("Deleting course...");
			Course.findByIdAndDelete(courseID)
				.then((course) => {
					// remove from enrolled users courses collection
					for (let user of course.users) {
						User.findById(user._id).then((user) => {
							user.courses = user.courses.filter((course) => {
								return course._id != courseID;
							});
							user.save().catch((err) => {
								res.status(500);
								console.log(err);
							});
						});
					}
					res.cookie("notify", {
						status: "success",
						message: "Course deleted!",
					});
					res.status(200);
					res.redirect("/");
				})
				.catch((err) => {
					res.status(500);
					console.log(err);
				});
		} else {
			res.cookie("notify", {
				status: "error",
				message: "Cannot delete course created by another user",
			});
			res.status(403);
			res.redirect(`/details/${courseID}`);
		}
	});
};
