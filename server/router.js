const Authentication = require("./controllers/authentication");

module.exports = function (app) {
	// Define a route a user can visit
	app.post("/signup", Authentication.signup);

	app.get("/", (req, resp, next) => {
		resp.send({ success: true });
	});
};
