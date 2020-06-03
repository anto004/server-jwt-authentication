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

// Local Strategy("local") to verify password
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

			// Pass user to req
			// Access it using req.user
			return done(null, user);
		});
	});
});

// Setup options for JWT Strategy ("jwt")
const jwtOptions = {
	jwtFromRequest: ExtractJwT.fromHeader("authorization"),
	secretOrKey: config.secret,
};

// JwTStrategy to Verify Token
// payload is passed after Jwt encoding during signup
// payload {sub: id, iat: timestamp}
/*
	// Token is converted to payload with id
	// JwT uses something like this to provide a payload with id
	verify(token, secretOrKey, function (err, payload) {
		if(err) {return done(err)}
		return payload
	})
*/
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
