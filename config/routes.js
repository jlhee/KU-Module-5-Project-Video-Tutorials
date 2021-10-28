// Packages
const jwt = require("jsonwebtoken");

// Constants
const jwtConfig = require("../config/config").jwt;

// Controllers
const home = require("../controllers/home");
const details = require("../controllers/details");
const register = require("../controllers/register");
const login = require("../controllers/login");
const create = require("../controllers/create");
const edit = require("../controllers/edit");
const enroll = require("../controllers/enroll");
const deleteCourse = require("../controllers/delete");
const validate = require("../controllers/validators");

module.exports = (app) => {
	/* - - - MIDDLEWARE - - - */

	// check if user exists and verify token
	app.use((req, res, next) => {
		res.notify = req.cookies.notify;
		res.clearCookie("notify");

		if (req.cookies.user) {
			// user token exists
			try {
				let decodedJWT = jwt.verify(req.cookies.user, jwtConfig.secret);
				res.user = { id: decodedJWT.id, username: decodedJWT.username };
				next();
			} catch (err) {
				// token expired
				console.log("user token expired");
				res.status(401);
				res.clearCookie("user");
				res.cookie("notify", {
					status: "warning",
					message: "Session expired - please log in",
				});
				res.redirect("/");
			}
		} else {
			next();
		}
	});

	// redirect guest users from unauthorized pages
	app.use(
		[
			"/details/:id",
			"/create/course",
			"/edit/course/:id",
			"/delete/course/:id",
			"/enroll/:id",
			"/logout",
		],
		(req, res, next) => {
			if (!res.user) {
				res.cookie("notify", {
					status: "warning",
					message: "No user logged in",
				});
				res.redirect("/");
			} else {
				next();
			}
		}
	);

	// redirect logged-in users from unauthorized pages
	app.use(["/login", "/register"], (req, res, next) => {
		if (res.user) {
			res.cookie("notify", {
				status: "warning",
				message: "Already logged in",
			});
			res.redirect("/");
		} else {
			next();
		}
	});

	/* - - - ROUTES - - - */
	app.get("/", home);

	app.get("/details/:id", details);

	app.get("/register", register.get);
	app.post("/register", validate.registerUser(), register.post);

	app.get("/login", login.get);
	app.post("/login", login.post);

	app.get("/logout", (req, res) => {
		res.clearCookie("user");
		res.cookie("notify", {
			status: "success",
			message: "Logout successful",
		});
		res.redirect("/");
	});

	app.get("/create/course", create.get);
	app.post("/create/course", validate.course(), create.post);

	app.get("/edit/course/:id", edit.get);
	app.post("/edit/course/:id", validate.course(), edit.post);

	app.get("/delete/course/:id", deleteCourse);

	app.get("/enroll/:id", enroll);

	app.get("*", (req, res) => {
		res.status(404);
		res.cookie("notify", {
			status: "error",
			message: "Error 404: Page does not exist",
		});
		res.redirect("/");
	});
};
