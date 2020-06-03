const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

// If user authenticated don't create a new session
const requireAuth = passport.authenticate(["jwt", "local"], { session: false });
const loginAuth = passport.authenticate("local", {
	session: false,
	failureRedirect: "/login",
});

module.exports = function (app) {
	// Define a route a user can visit
	app.post("/signup", Authentication.signup);

	app.post("/login", loginAuth, function (req, res) {
		res.send({ mesg: "Authentication success" });
	});

	app.get("/", requireAuth, function (req, resp, next) {
		resp.send({ mesg: "hello" });
	});
};
