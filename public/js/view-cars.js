console.log("hello");
// Need to dynamically create divs for cars already stored into the database
// carContainer holds all of our cars
//     var carContainer = $(".car-col");
// // This function grabs cars from the database and updates the view
//     // Useful if someone wants to search for a specific make
//     function getCars() {
//         var carMakeString = make || "";
//         if (carMakeString) {
//         carMakeString = "/make/" + carMakeString;
//         }
//         $.get("/" + carMakeString, function(data) {
//         console.log("Cars", data);
//         cars = data;
//         if (!cars || !cars.length) {
//             displayEmpty();
//         }
//         else {
//             initializeRows();
//         }
//         });
//     }
//     // Getting the initial list of cars
//     getCars();
//     // InitializeRows handles appending all of our constructed post HTML inside
//     // carContainer
//     function initializeRows() {
//         carContainer.empty();
//         var postsToAdd = [];
//         for (var i = 0; i < cars.length; i++) {
//         carsToAdd.push(createNewRow(cars[i]));
//         }
//         carContainer.append(carsToAdd);
    }