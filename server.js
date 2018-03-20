var request = require('request');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const cheerio = require('cheerio');

var PORT = process.env.PORT || 3000;

// initialize express
var app = express();
// handling the form submissions
app.use(bodyParser.urlencoded({extended: true}));
// used to server the public folder as static directory - only hmtl file should be in here
app.use(express.static("public"));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Database configuration
var databaseURL = "scraper";
var collections = ["scrapedData"];


// HOW DO I UTILIZE THIS???
// Connecting the remote mongo database to mongoose if deployed, otherwise it will connect to the local mongoHeadlines database on your computer
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Hook the mongojs configuration to the db variable
// var db = mongojs(databaseURL, collections);
// db.on("error", function(err) {
//     console.log("Database Error:", error);
// });

