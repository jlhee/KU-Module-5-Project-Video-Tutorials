const Course = require("../models/Course");

module.exports = function (req, res) {
	console.log("Details page");

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
			// console.log(context);
			res.render("course-details", context);
		})
		.catch((err) => {
			console.log(err);
		});

	// let id = req.params.id;
	// let user = res.user;
	// let context = {};
	// context.type = res.show;
	// if (res.show != "none") {
	// 	context.message = res.message;
	// }
	// if (user) {
	// 	context.loggedIn = true;
	// }

	// Cube.findById(id)
	// 	.populate("accessories")
	// 	.then((cube) => {
	// 		if (user != undefined && user.id == cube.creator) {
	// 			context.isCurrentUser = true;
	// 		}
	// 		context = { ...cube.toJSON(), ...context };
	// 		// console.log(context);
	// 		res.render("details", context);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
};
