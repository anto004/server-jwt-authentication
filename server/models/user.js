const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
	// one email for one account
	email: { type: String, unique: true, lowercase: true },
	password: String,
});

// Create model class
const ModelClass = mongoose.model("user", userSchema);

// Export model
module.exports = ModelClass;
