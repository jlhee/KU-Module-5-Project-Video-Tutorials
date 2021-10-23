const Course = require("../models/Course");
const { validationResult } = require("express-validator");

module.exports = function (req, res) {
	res.render("guest-home");
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
