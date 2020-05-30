const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwTStrategy = require("passport-jwt").Strategy;
const ExtractJwT = require("passport-jwt").ExtractJwt;

// Setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwT.fromHeader("authorization"),
	secretOrKey: config.secret,
};

// Create JWT Strategy
// payload is passed after Jwt encoding during authentication
// payload {sub: id, iat: timestamp}
const jwtLogin = new JwTStrategy(jwtOptions, function (payload, done) {
	User.findById(payload.sub, function (err, user) {
		if (err) {
			return done(err, false);
		}

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

passport.use(jwtLogin);
