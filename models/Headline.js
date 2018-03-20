var mongoose = require("mongoose");

// reference to the Schema constructor
var Schema = mongoose.Schema;

// Use Schema constructor to create the new Schema object
var ArticleSchema = new Schema({
    // requires object types
    category: {
        type: String
    },
    header: {
        type: String,
        unique: true
    },
    link: {
        type: String
    },
    imgURL: {
        type: String
    },
    timeStamp: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // `note` is an object to store Note id
    // ref: is property link for the objectId to the Note model to populate the Article with the note that's been iD
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});
// Create the model using mongoose model from schema
var Article = mongoose.model("Article", ArticleSchema);
// Export article
module.exports = Article;