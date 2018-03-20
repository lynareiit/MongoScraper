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

// require all files in models folder
var db = require("./models");

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

// ---------------> NEED TO .GET FOR ALL SCRAPING <------------------------
// ---------------> NEED TO .POST AFTER FOR ALL POSTING TO SCRAPED ARTICLES <------------------------

// Main route for the main html screen
app.get("/", function(req, res) {
    res.send("I'm Home");
});

// Retrieve the data here from the database
app.get("/all", function(req, res) {
    // Finding all the results from the Scraped collection in the db
    db.ScrapedData.find({}, function(err, found) {
        if(err) {
            console.log(err);
        }
        else {
            res.json(found);
        }
    });
});

// Scrape data to place into database
app.get("/scrape", function(req, res) {
    request("https://www.cnn.com", function(err, response, html) {
        // load html body from the requests into cheerio for scraping functionality
        var $ = cheerio.load(html);

        $(".title").each(function(i, element) {
            // New elements
            var title = $(element).children("a").text();
            var link = $(element).children("a").attr("href");

            // title and link present
            if(title && link) {
                db.scrapedData.insert({
                    title: title,
                    link: link,
                    description: description
                },
                function(err, inserted) {
                    if(err) {
                        console.log(err);
                    }
                    else {
                        console.log(inserted);
                    }
                });
            }
        });
    });

// Saving a note to the article in the db
app.post("/submit", function(req, res) {
    // Create a new note in db
    db.Note.create(req.body)
        .then(function(dbNote) {
            // push new notes of the user to a notes array
            // setting new: true tells query to return the updated user data
            return db.User.findOneandUpdate({}, {$push: {notes: dbNote._id }}, {new: true});
        })
        .then(function(dbUser) {
            res.json(dbUser);
        })
        .catch(function(err) {
            res.json(err);
        });
});

    res.send("Scrape Complete");
});

// Listen on port 3000
app.listen(3000, function() {
    console.log("App is running on port 3000!")
})