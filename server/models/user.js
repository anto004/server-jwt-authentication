const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
	// one email for one account
	email: { type: String, unique: true, lowercase: true },
	password: String,
});

// encrypt password
// Before saving our model
userSchema.pre("save", function (next) {
	// Get access to user model
	const user = this;

	// Generate a salt
	bcrypt.genSalt(10, function (err, salt) {
		if (err) {
			return next(err);
		}

		// hash (encrypt) our password
		bcrypt.hash(user.password, salt, null, function (err, hash) {
			if (err) {
				return next(err);
			}

			user.password = hash;

			// Continue saving our model
			next();
		});
	});
});

// Create model class
const ModelClass = mongoose.model("user", userSchema);

// Export model
module.exports = ModelClass;
