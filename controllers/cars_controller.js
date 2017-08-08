// ====== DEPENDENCIES =========================
// Node dependencies
var express = require("express");
var router = express.Router();

// Importing the models directory
var db = require("../models/");

// Extracts the sequelize connection from the models object
// var sequelizeConnection = db.sequelize;

// sequelizeConnection.sync({ force: true });

// Thie file offers a set of routes for displaying and saving data to the db
// Create all of our routes and set up logic within those routes where required
// Routes
// GET route
// get route -> index
// router.get("/", function(req, res) {
//   // send us to the next get function instead.
//   res.redirect("/cars");
// });

// router.get("/", function(req, res) {
//     res.render("../public/index.html");
//   });

router.get("/cars", function(req, res) {
	// findAll returns all entries for a table (cars) when used with no options
    // Getting an ERROR here "Cannot read property 'findAll' of undefined"
	db.Car.findAll().then(function(dbCar) {
        console.log(dbCar);
		var hbsObject = {
			cars: dbCar
		};
		// We have access to the burgers as an argument inside of the callback function.
		res.render("index", hbsObject);
	});
});

// POST route to making/saving a new Car
router.post("/cars/create", function(req, res) {
	// Create takes an argument of an object describing the car we want to insert into our table. In this case we want to pass an object with the car's specs
	db.Car.create({
		make: req.body.make,
		model: req.body.model,
        year: req.body.year,
        color: req.body.color, 
        miles: req.body.miles,
        price: req.body.price,
        sold: false
	}).then(function(dbCar){
		// We have access to the cars as an argument inside of the callback function.
		res.redirect("/");
	});
});

// PUT route for updating a cars's sold status
router.put("/cars/update", function(req, res) {
	// Update takes in 2 arguments, an object describing the properties we want to update, and a "where" object describing the Burger we want to update
	db.Car.update({
		sold: req.body.sold
	}, {
		where: {
			id: req.params.id
		}
	}).then(function(dbCar) {
		// We have access to the cars as an argument inside of the callback function.
		res.redirect("/");
	});

// DELETE route 
// router.delete("/:id", function(req, res) {

//     db.Car.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(function() {
//         res.redirect("/");
//     });
// });
});

module.exports = router;