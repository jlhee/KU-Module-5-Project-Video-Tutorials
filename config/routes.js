// import packages
// import constants
// import controllers
const home = require("../controllers/home");
const details = require("../controllers/details");

module.exports = (app) => {
	app.get("/", home);

	app.get("/details/:id", details);

	// app.get("/register", register.get);
	// app.post("/register", register.post);

	// app.get("/login", login.get);
	// app.post("/login", login.post);

	// app.get("/logout", logout);

	// app.get("/create/course", createCourse.get);
	// app.post("/create/course", createCourse.post);

	// app.get("/edit/course/:id", editCourse.get);
	// app.post("/edit/course/:id", editCourse.post);

	// app.get("/delete/course/:id", deleteCourse.get);
	// app.post("/delete/course/:id", deleteCourse.post);
};
