const Course = require("../models/Course");

module.exports = function (req, res) {
	let context = {
		loggedIn: true,
		username: res.user.username,
		notify: res.notify,
	};
	let user = res.user;
	let courseID = req.params.id;

	Course.findById(courseID)
		.then((course) => {
			if (user.id == course.creator) {
				context.isCreator = true;
			}
			if (course.users.includes(user.id)) {
				context.enrolled = true;
			}
			context = { ...course.toJSON(), ...context };
			res.render("course-details", context);
		})
		.catch((err) => {
			console.log(err);
		});
};
