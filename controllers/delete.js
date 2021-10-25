const Course = require("../models/Course");

module.exports = function (req, res) {
	console.log("deleting course");
	let courseID = req.params.id;
	let user = res.user;

	Course.findById(courseID).then((course) => {
		if (user.id == course.creator) {
			Course.findByIdAndDelete(courseID)
				.then((course) => {
					console.log(course.title + " deleted");
					res.cookie("notify", {
						status: "success",
						message: "Course deleted!",
					});
					res.redirect("/");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
};
