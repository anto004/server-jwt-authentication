const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

// If user authenticated don't create a new session
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = function (app) {
	// Define a route a user can visit
	app.post("/signup", Authentication.signup);

	app.get("/", requireAuth, (req, resp, next) => {
		resp.send({ mesg: "hello" });
	});
};
