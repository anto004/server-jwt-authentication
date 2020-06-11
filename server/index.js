// Main starting point
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

// TODO: Add linting and prettier

// DB Setup
mongoose.connect("mongodb://localhost/auth", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//App Setup
// morgan is for logging incoming requests
app.use(morgan("combined"));

//CORS
// Accept request from anywhere
app.use(cors());

// Parse incoming http request to json
app.use(bodyParser.json({ type: "*/*" }));

// Add middleware
app.use(passport.initialize());

// Route Incoming requests
router(app);

// Server Setup
// Use whichever is available
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);
