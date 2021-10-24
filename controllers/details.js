const Course = require("../models/Course");

module.exports = function (req, res) {
	console.log("Details page");
	let id = req.params.id;
	let context = {};

	Course.findById(id)
		.then((course) => {
			// if (user != undefined && user.id == cube.creator) {
			// 	context.isCurrentUser = true;
			// }
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
