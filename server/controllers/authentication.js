const User = require("../models/user");

exports.signup = function (req, resp, next) {
	const email = req.body.email;
	const password = req.body.password;

	// Check if a user with the given email exists
	User.findOne({ email: email }, function (err, existingUser) {
		if (err) {
			return next(err);
		}

		// If a user with email exists
		if (existingUser) {
			return resp.status(422).send({ err: "Email is in use" });
		}

		// iF a user with email does not exists
		const user = new User({
			email: email,
			password: password,
		});

		user.save(function (err) {
			if (err) {
				return next(err);
			}

			// Respond to request indicating the User was created
			resp.json(user);
		});
	});

	// Respond to
};
