var mongoose = require("mongoose");
// must access the Schema constructor from mongoose
var mySchema = mongoose.Schema;

// create a function with a schema object like in exercise
var noteSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    }
});

// new variable to relate Note to the mongoose model, pass in noteSchema
var note = mongoose.model("Note, noteSchema");
module.exports = note;