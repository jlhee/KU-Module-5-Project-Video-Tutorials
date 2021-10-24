const Course = require("../models/Course");

module.exports = {
	get: function (req, res) {
		res.render("create-course");
		// if (res.user) {
		// 	res.show = "none";
		// 	res.render("create", { loggedIn: true });
		// } else {
		// 	res.cookie("status", {
		// 		type: "warning",
		// 		message: "Please login to create a cube",
		// 	});
		// 	res.redirect("/");
		// }
	},
	post: function (req, res) {
		// console.log("Creating cube...");
		// let name = req.body.name.trim();
		// let description = req.body.description.trim();
		// let imgURL = req.body.imgURL.trim();
		// let difficulty = req.body.difficulty;
		// let context = {
		// 	name,
		// 	description,
		// 	imgURL,
		// 	difficulty,
		// 	loggedIn: true,
		// };
		// context[context.difficulty] = "selected";
		// if (name.length < 5 || /[^a-zA-Z0-9 ]/g.test(name)) {
		// 	context.type = "error";
		// 	context.message =
		// 		"Cube name must be at least 5 characters long and only contain letters, numbers, and spaces";
		// 	return res.render("create", context);
		// } else if (
		// 	description.length < 20 ||
		// 	/[^a-zA-Z 0-9\.]/g.test(description)
		// ) {
		// 	context.type = "error";
		// 	context.message =
		// 		"Cube description must be at least 20 characters long and only contain letters, numbers, and spaces";
		// 	return res.render("create", context);
		// } else if (
		// 	!(imgURL.startsWith("http://") || imgURL.startsWith("https://"))
		// ) {
		// 	context.type = "error";
		// 	context.message = "Please enter a valid image URL";
		// 	return res.render("create", context);
		// } else if (isNaN(difficulty) || difficulty < 1 || difficulty > 6) {
		// 	context.type = "error";
		// 	context.message =
		// 		"Please select a valid difficulty from the options provided";
		// 	return res.render("create", context);
		// } else {
		// 	new Cube({
		// 		name,
		// 		description,
		// 		imgURL,
		// 		difficulty,
		// 		creator: res.user.id,
		// 	})
		// 		.save()
		// 		.then((cube) => {
		// 			// console.log(cube);
		// 			res.cookie("status", {
		// 				type: "success",
		// 				message: "Cube created!",
		// 			});
		// 			res.redirect("/");
		// 		})
		// 		.catch((err) => {
		// 			console.log(err);
		// 		});
		// }
	},
};
