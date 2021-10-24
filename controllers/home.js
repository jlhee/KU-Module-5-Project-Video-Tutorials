const Course = require("../models/Course");
const { validationResult } = require("express-validator");

module.exports = function (req, res) {
	let context = { loggedIn: res.loggedIn, notify: res.notify };

	if (res.notify) {
		context.message = res.message;
	}

	Course.find({}).then((courses) => {
		let publicCourses = courses
			.filter((course) => {
				return course.isPublic == true;
			})
			.map((course) => (course = course.toJSON()));
		if (res.user) {
			// TODO: show most recent 3 courses
			context.courses = publicCourses;
			res.render("user-home", context);
		} else {
			// TODO: show top 3 courses
			context.courses = publicCourses;
			res.render("guest-home", context);
		}
	});

	// let context = {};
	// context.type = res.show;
	// if (res.show != "none") {
	// 	context.message = res.message;
	// }
	// if (res.user) {
	// 	context.loggedIn = true;
	// }

	// Cube.find({}).then((cubes) => {
	// 	context.cubes = cubes.map((cube) => (cube = cube.toJSON()));
	// 	res.render("index", context);
	// });
};
