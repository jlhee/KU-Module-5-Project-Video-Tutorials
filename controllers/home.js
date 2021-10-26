const Course = require("../models/Course");

module.exports = function (req, res) {
	let context = {
		loggedIn: res.user ? true : false,
		username: res.user ? res.user.username : null,
		notify: res.notify,
	};

	Course.find({}).then((courses) => {
		let publicCourses = courses
			.filter((course) => {
				return course.isPublic == true;
			})
			.map((course) => (course = course.toJSON()));
		if (res.user) {
			// show all public courses in descending order by creation
			context.courses = publicCourses.sort(
				(a, b) => b.createdAt - a.createdAt
			);
			res.render("user-home", context);
		} else {
			// show top 3 public courses by enrolled users (descending)
			context.courses = publicCourses
				.sort((a, b) => b.users.length - a.users.length)
				.slice(0, 3);
			res.render("guest-home", context);
		}
	});
};
