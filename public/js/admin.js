$(document).ready(function() {
    // Gets the part of the url that comes after the "?" (which we have if we're updating a car)
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var postID;

    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
    if (url.indexOf("?post_id=") !== -1) {
        postId = url.split("=")[1];
        getPostData(postId);
    }

    // Getting jQuery references to the post body, title, form, and author select
    var carForm = $("#car-input");
    var makeInput = $("#make");
    // // If we use a pregenerated list for the make
    // var postCategorySelect = $("#category");
    // // Giving the carMakeSelect a default value
    // carMakeSelect.val("Audi");
    var modelInput = $("#model");
    var yearInput = $("#year");
    var colorInput = $("#color");
    var milesInput = $("#miles");
    var priceInput = $("#price");
    // Adding an event listener for when the form is submitted
    $(carForm).on("submit", function handleFormSubmit(event) {
        event.preventDefault();
        //Form validation
        if (!makeInput.val().trim() || !modelInput.val().trim() || !yearInput.val().trim() || !colorInput.val().trim() || !milesInput.val().trim() || !priceInput.val().trim()){
            return;
        }
        // Constructing a newCar object to hand to the database
        var newCar = {
            make: makeInput.val().trim(),
            // // If a category selection for make
            // make: carMakeSelect.val(),
            model: modelInput.val().trim(),
            year: yearInput.val().trim(),
            color: colorInput.val().trim(),
            miles: milesInput.val().trim(),
            price: priceInput.val().trim()
        };

        console.log(newCar);
    });
});