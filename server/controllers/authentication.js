const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

// Generate Token
// JWT has 3 parts (Header Payload SecretKey)
// Encoded without header
function tokenForUser(user) {
	const payload = {
		sub: user.id,
		iat: new Date().getTime(),
	};
	const secret = config.secret;

	return jwt.encode(payload, secret);
}

// Provide a token for user
exports.signin = function (req, res, next) {
	// User has already had their email and password Authenticated
	// UsingLocalStrategy

	res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, resp, next) {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return resp
			.status(422)
			.send({ err: "Both email and password is required" });
	}

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

			// Respond to request with JWT
			resp.json({ token: tokenForUser(user) });
		});
	});
};
