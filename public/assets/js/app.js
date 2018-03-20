// grab articles as json
$.getJSON("/api/articles", function(data) {
    // for each
    for (var i = 0; i < data.length; i++) {
        // // Display apropos  information on page
        // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].link + "</p>");
        console.log(data[i])
    }
});

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
    var thisId = $(this).attr("data-id");

    // Make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }).then(function() {
        location.reload();
    });
});

// Click the addnote button
$(document).on("click", ".add-note-btn", function() {
    // Empty notes data
    $("#notes").empty();
    $("#note-form").empty();
    // id from notes button
    var thisId = $(this).attr("data-id");

    // Ajax call to get notes data
    $.ajax({
        method: "GET",
        url: "/api/articles" + thisId
    }).then(function(data) {
        console.log(data);
        console.log(data.note);

        if(data.note) {
            // notes append handlebars
        }
        // handlebars
    });
});

$(document).on("click", "#add-note", function() {
    // id for the button
    var thisId = $(this).attr("data-id");

    // run a post request to change the note to enter in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // value of the title input
            title: $("#note-titleinput").val(),
            // value taken from note textarea
            body: $("#note-bodyinput").val()
        }
    })
    .then(function(data) {
        console.log(data);
        $("#notes-modal").modal("hide");
        $("#note-form").empty();
    });
});
$(document).on("click", "#delete-note", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "DELETE",
        url: "/api/articles/" + thisId
    }).then(function() {
        $('#notes-modal').modal('hide');
        $('#note-form').empty();
    });
});