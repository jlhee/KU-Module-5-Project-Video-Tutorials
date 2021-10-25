const Course = require("../models/Course");
const User = require("../models/User");

module.exports = function (req, res) {
	let courseID = req.params.id;
	let user = res.user;

	Course.findById(courseID)
		.then((course) => {
			course.users.push(user.id);
			course.save();
			User.findById(user.id).then((user) => {
				user.courses.push(courseID);
				user.save();
			});

			res.cookie("notify", {
				status: "success",
				message: "Enrolled in course!",
			});

			res.redirect("/");
		})
		.catch((err) => {
			console.log(err);
		});
};
