// Main starting point
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");

// DB Setup
mongoose.connect("mongodb://localhost/auth", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

//App Setup
// morgan is for logging incoming requests
app.use(morgan("combined"));

// body-parser parse incoming request to json
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//Server Setup
// Use whichever is available
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);
