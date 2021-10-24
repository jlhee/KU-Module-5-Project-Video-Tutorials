const Course = require("../models/Course");

module.exports = {
	get: function (req, res) {
		res.render("edit-course");
		// let id = req.params.id;
		// let user = res.user;
		// let context = {};
		// context.type = res.show;
		// if (res.show != "none") {
		// 	context.message = res.message;
		// }
		// // If creator logged in: show edit page. Else: redirect to cube details page.
		// if (user) {
		// 	context.loggedIn = true;

		// 	Cube.findById(id)
		// 		.then((cube) => {
		// 			if (user.id == cube.creator) {
		// 				context = {
		// 					...cube.toJSON(),
		// 					...context,
		// 				};
		// 				context[context.difficulty] = "selected";
		// 				// console.log(context);
		// 				res.render("editCube", context);
		// 			} else {
		// 				// current user is not creator
		// 				res.cookie("status", {
		// 					type: "error",
		// 					message: "Cannot edit cube made by another user",
		// 				});
		// 				res.redirect(`/details/${id}`);
		// 			}
		// 		})
		// 		.catch((err) => {
		// 			console.log(err);
		// 		});
		// } else {
		// 	res.cookie("status", {
		// 		type: "warning",
		// 		message: "Please login to edit/delete your cubes",
		// 	});
		// 	res.redirect("/");
		// }
	},
	post: function (req, res) {
		// let id = req.params.id;
		// let name = req.body.name.trim();
		// let description = req.body.description.trim();
		// let imgURL = req.body.imgURL.trim();
		// let difficulty = req.body.difficulty;
		// let context = { name, description, imgURL, difficulty, loggedIn: true };
		// context[context.difficulty] = "selected";
		// // build cube and save to db
		// Cube.findById(id).then((cube) => {
		// 	context = { ...cube.toJSON(), ...context };
		// 	if (name.length < 5 || /[^a-zA-Z0-9 ]/g.test(name)) {
		// 		context.type = "error";
		// 		context.message =
		// 			"Cube name must be at least 5 characters long and only contain letters, numbers, and spaces";
		// 		return res.render("editCube", context);
		// 	} else if (
		// 		description.length < 20 ||
		// 		/[^a-zA-Z 0-9\.]/g.test(description)
		// 	) {
		// 		context.type = "error";
		// 		context.message =
		// 			"Cube description must be at least 20 characters long and only contain letters, numbers, and spaces";
		// 		return res.render("editCube", context);
		// 	} else if (
		// 		!(imgURL.startsWith("http://") || imgURL.startsWith("https://"))
		// 	) {
		// 		context.type = "error";
		// 		context.message = "Please enter a valid image URL";
		// 		return res.render("editCube", context);
		// 	} else if (isNaN(difficulty) || difficulty < 1 || difficulty > 6) {
		// 		context.type = "error";
		// 		context.message =
		// 			"Please select a valid difficulty from the options provided";
		// 		return res.render("editCube", context);
		// 	} else {
		// 		cube.name = name;
		// 		cube.description = description;
		// 		cube.imgURL = imgURL;
		// 		cube.difficulty = difficulty;
		// 		// console.log(cube);
		// 		cube.save()
		// 			.then((cube) => {
		// 				res.cookie("status", {
		// 					type: "success",
		// 					message: "Cube updated!",
		// 				});
		// 				res.redirect(`/details/${id}`);
		// 			})
		// 			.catch((err) => {
		// 				console.log(err);
		// 			});
		// 	}
		// });
	},
};
