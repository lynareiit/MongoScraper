var request = require("request");
var express = require("Express");
var cheerio = require("cheerio");
var moment = require("moment");

// require all files in models folder
var db = require("../models");

var router = express.Route();

// NEED TO .GET FOR ALL SCRAPING
// NEED TO .POST AFTER FOR ALL POSTING TO SCRAPED ARTICLES
// Main router for the main html screen
// router.get("/", function(req, res) {
//     res.send("I'm Home");
// });
// Retrieve the data here from the database <--- This is the main router
router.get("/", function(req, res) {
    // Finding all the results from the Scraped collection in the db
    db.ScrapedData.find({}.sort({createdAt: -1}).then(function(dbArticle) {
        // if(err) {
        //     console.log(err);
        // }
        // else {
        //     res.json(found);
        var grabbedArticles = {
            articles: dbArticle
        }
        res.render("home", grabbedArticles);
        }).catch(function(err) {
            res.json(err);
    }));
});

router.get("/saved/", function(req, res) {
    db.Article.find({ 'saved': true}).sort({createdAt: -1}).then(function(dbArticle) {
        var grabbedArticles = {
            articles: dbArticle
        }
        res.render("saved", grabbedArticles); 
    }).catch(function(err) {
        res.json(err);
    });
})

// Scrape data to place into database
router.get("/scrape", function(req, res) {
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
                        throw err;
                    }
                    else {
                        console.log(inserted);
                    }

            // -----------------> PLACE RESULTS HERE. HOW IS IT DISPLAYED? A LIST? SOME GRID? <-----------
                
                });
            }
        });
    });
// Saving a note to the article in the db
router.post("/api/articles/save:id", function(req, res) {
    // Create a new note in db
    db.Note.create(req.body)
        .then(function(dbArticle) {
            // push new notes of the user to a notes array
            // setting new: true tells query to return the updated user data
            return db.Article.findOneandUpdate({_id: req.params.id}, {save: true}, {$push: {notes: dbNote._id }}, {new: true});
        })
        .then(function(dbArticle) {
            res.json(dbArtice);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// Unsaving a note to the article in the db
router.post("/api/articles/unsave:id", function(req, res) {
    // Create a new note in db
    db.Note.create(req.body)
        .then(function(dbArticle) {
            // push new notes of the user to a notes array
            // setting new: true tells query to return the updated user data
            return db.Article.findOneandUpdate({_id: req.params.id}, {save: false}, {$push: {notes: dbNote._id }}, {new: true});
        })
        .then(function(dbArticle) {
            res.json(dbArtice);
        })
        .catch(function(err) {
            res.json(err);
        });
});

// ---------> Place delete capability <------------
router.delete("api/articles/:id", function(req,res) {
    // instead of create db need delete functionality
    db.Note.remove(req.body)
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
    });
    res.send("Scrape Complete");
});

// // Listen on port 3000
// router.listen(3000, function() {
//     console.log("router is running on port 3000!")
// })
module.exports = router;