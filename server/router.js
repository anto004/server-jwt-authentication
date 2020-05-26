module.exports = function (app) {
	// Define a route a user can visit
	app.get("/", function (req, res, next) {
		res.send(["waterbottle", "calendar", "pen"]);
	});
};
