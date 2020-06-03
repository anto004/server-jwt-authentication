const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwTStrategy = require("passport-jwt").Strategy;
const ExtractJwT = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

// Authenticate user
// Verify email and password
// Look for email instead of username
const localOptions = {
	usernameField: "email", // default: usernameField: username
	passwordField: "password",
};

// Local Strategy to verify password
const localStrategy = new LocalStrategy(localOptions, function (
	email,
	password,
	done
) {
	User.findOne({ email: email }, function (err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false);
		}

		user.comparePasswords(password, function (err, isMatch) {
			if (err) {
				return done(err);
			}
			if (!isMatch) {
				return done(null, false);
			}

			return done(null, user);
		});
	});
});

// Setup options for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwT.fromHeader("authorization"),
	secretOrKey: config.secret,
};

// JwTStrategy to Verify Token
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
passport.use(localStrategy);
