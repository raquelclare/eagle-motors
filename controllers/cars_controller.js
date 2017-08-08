//requre express and the cars model
var express = require("express");
var car = require("../models/car.js");

var router = express.Router();

// Create all routes and set up logic within those routes where required

//get all cars
router.get("/", function(req, res) {
  car.selectAll(function(data) {
    var hbsObject = {
      cars: data
    };
    console.log("object: ", hbsObject);
    res.render("index", hbsObject);
  });
});

router.get("/view-cars", function(req, res) {
  car.selectAll(function(data) {
    var hbsObject = {
      cars: data
    };
    console.log("object: ", hbsObject);
    res.render("view-cars.handlebars", hbsObject);
  });
});

router.get("/admin", function(req, res) {
  car.selectAll(function(data) {
    var hbsObject = {
      cars: data
    };
    console.log("object: ", hbsObject);
    res.render("admin.handlebars", hbsObject);
  });
});

//insert a car
router.post("/", function(req, res) {
  car.insertOne([
    "make", "model", "year", "color", "miles", "price", "sold"
  ], [
    req.body.make, req.body.model, req.body.year, req.body.color, req.body.miles, req.body.price, req.body.sold
  ], function() {
    res.redirect("/");
  });
});

//update a car
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  car.updateOne({
    completed: req.body.completed
  }, condition, function() {
    res.redirect("/");
  });
});

//delete a car
router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  car.delete(condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;