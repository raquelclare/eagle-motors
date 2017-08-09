// console.log("hello");
// var request = require("../controllers/cars_controller.js");

$(document).ready(function() {

    // GRABBING DATA
    // Gets the part of the url that comes after the "?" (which we have if we're updating a car)
    // Gets an optional query string from our url (i.e. ?post_id=23)
    // var url = window.location.search;
    // var postID;

    // // Sets a flag for whether or not we're updating a post to be false initially
    // var updating = false;

    // // If we have this section in our url, we pull out the post id from the url
    // // In localhost:8080/cms?post_id=1, postId is 1
    // if (url.indexOf("?post_id=") !== -1) {
    //     postId = url.split("=")[1];
    //     getPostData(postId);
    // }

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
            price: priceInput.val().trim(),
            // Does this need to be here?
            sold: false
        };

        console.log(newCar);

        // // If we're updating a post run updatePost to update a post
        // // Otherwise run submitPost to create a whole new post
        // if (updating) {
        // newCar.id = postId;
        // updateCar(newCar);
        // }
        // else {
        // submitCar(newPost);
        // }
    });


    // FUNCTIONS FOR THE DATA CAPTURED-- DYNAMICALLY CREATING HTML FOR EACH CAR
    // This code is currently for the admin page but needs to also be added (without any buttons) to view-cars
    // All of this needs to be edited to match CARS instead of Posts
    // carContainer holds all of our cars

    // commenting out

    // var carContainer = $(".car-container");
    // // // IF we end up using a pregen list for car makes
    // // var carMakeSelect = $("#make");
    // // Click events for the edit and delete buttons
    // $(document).on("click", "button.delete", handleCarDelete);
    // $(document).on("click", "button.edit", handleCarEdit);
    // // postCategorySelect.on("change", handleCategoryChange);
    // var cars;

    // // This function grabs cars from the database and updates the view
    // // Useful if someone wants to search for a specific make
    // function getCars() {
    //     // var carMakeString = make || "";
    //     // if (carMakeString) {
    //     // carMakeString = "/make/" + carMakeString;
    //     // }
    //     // $.get("/api/cars" + carMakeString, function(data) {
    //     // console.log("Cars", data);
    //     // cars = data;
    //     if (!cars || !cars.length) {
    //         displayEmpty();
    //     }
    //     else {
    //         initializeRows();
    //     }
    //     });
    // }

    // // This function does an API call to delete posts
    // function deleteCar(id) {
    //     $.ajax({
    //     method: "DELETE",
    //     url: "/api/cars/" + id
    //     })
    //     .done(function() {
    //     getCars(carMakeSelect.val());
    //     });
    // }

    // // Getting the initial list of cars
    // getCars();
    // // InitializeRows handles appending all of our constructed post HTML inside
    // // carContainer
    // function initializeRows() {
    //     carContainer.empty();
    //     var postsToAdd = [];
    //     for (var i = 0; i < cars.length; i++) {
    //     carsToAdd.push(createNewRow(cars[i]));
    //     }
    //     carContainer.append(carsToAdd);
    // }

    // // This function constructs a car's HTML
    // function createNewRow(car) {
    //     var newCarPanel = $("<div>");
    //     newCarPanel.addClass("panel panel-default");
    //     var newCarPanelHeading = $("<div>");
    //     newCarPanelHeading.addClass("panel-heading");
    //     var deleteBtn = $("<button>");
    //     deleteBtn.text("x");
    //     deleteBtn.addClass("delete btn btn-danger");
    //     var editBtn = $("<button>");
    //     editBtn.text("EDIT");
    //     editBtn.addClass("edit btn btn-default");
    //     var newCarTitle = $("<h2>");
    //     var newCarDate = $("<small>");
    //     var newCarMake = $("<h5>");
    //     newCarMake.text(car.make);
    //     // newCarMake.css({
    //     // float: "right",
    //     // "font-weight": "700",
    //     // "margin-top":
    //     // "-15px"
    //     // });
    //     var newCarPanelBody = $("<div>");
    //     newCarPanelBody.addClass("panel-body");
    //     var newCarBody = $("<p>");
    //     newCarTitle.text(car.title + " ");
    //     newCarBody.text(car.body);
    //     var formattedDate = new Date(post.createdAt);
    //     formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    //     newCarDate.text(formattedDate);
    //     newCarTitle.append(newPostDate);
    //     newCarPanelHeading.append(deleteBtn);
    //     newCarPanelHeading.append(editBtn);
    //     newCarPanelHeading.append(newPostTitle);
    //     newCarPanelHeading.append(newPostCategory);
    //     newCarPanelBody.append(newPostBody);
    //     newCarPanel.append(newPostPanelHeading);
    //     newCarPanel.append(newPostPanelBody);
    //     newCarPanel.data("car", post);
    //     return newCarPanel;
    // }

    // // This function figures out which post we want to delete and then calls
    // // deletePost
    // function handleCarDelete() {
    //     var currentCar = $(this)
    //     .parent()
    //     .parent()
    //     .data("car");
    //     deleteCar(currentCar.id);
    // }

    // // This function figures out which post we want to edit and takes it to the
    // // Appropriate url
    // function handleCarEdit() {
    //     var currentCar = $(this)
    //     .parent()
    //     .parent()
    //     .data("car");
    //     window.location.href = "/cms?post_id=" + currentCar.id;
    // }

    // // This function displays a messgae when there are no posts
    // function displayEmpty() {
    //     carContainer.empty();
    //     var messageh2 = $("<h2>");
    //     messageh2.css({ "text-align": "center", "margin-top": "50px" });
    //     messageh2.html("No cars have been added");
    //     carContainer.append(messageh2);
    // }

});