//requre express and the cars model
var express = require("express");
var car = require("../models/car.js");
var passport = require("passport"), LocalStrategy = require("passport-local").Strategy;

var router = express.Router();

// Create all routes and set up logic within those routes where required

//get all cars
router.get("/", function(req, res) {
  car.selectAll(function(data) {
    var hbsObject = {
      cars: data
    };
    //console.log("object: ", hbsObject);
    res.render("index", hbsObject);
  });
});

//view car inventory page
router.get("/view-cars", function(req, res) {
  car.selectAll(function(data) {
    var hbsObject = {
      cars: data
    };
    //console.log("object: ", hbsObject);
    res.render("view-cars.handlebars", hbsObject);
  });
});

//login page
router.get("/login", function(req, res) {
  res.render("login.handlebars");
});

//new admin registration page
router.get("/new-admin", function(req, res) {
  res.render("new-admin.handlebars", { title: "Add New Admin" });
});

//new admin registration
router.post("/new-admin", function(req, res, next) {
  // console.log("req body: ", req.body);
  var username = req.body.username;
  var password = req.body.password;
  var db = require("../config/connection.js");
  
  db.query("INSERT INTO admins (username, password) VALUES (?, ?)", [username, password], function(error, results, fields) {
    if (error) throw error;

    res.render("new-admin.handlebars", { title: "New Admin Added" });
  });
});

//admin site
router.get("/admin", function(req, res) {
  car.selectAll(function(data) {
    var hbsObject = {
      cars: data
    };
    //console.log("object: ", hbsObject);
    res.render("admin.handlebars", hbsObject);
  });
});

//insert a car
router.post("/", function(req, res) {
  car.insertOne([
    "make", "model", "year", "color", "miles", "price", "photo", "sold"
  ], [
    req.body.make, req.body.model, req.body.year, req.body.color, req.body.miles, req.body.price, req.body.photo, req.body.sold
  ], function() {
    res.redirect("/admin");
  });
});

//update a car
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  car.updateOne({
    sold: req.body.sold
  }, condition, function() {
    res.redirect("/admin");
  });
});

//delete a car
router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  car.delete(condition, function() {
    res.redirect("/admin");
  });
});

// Export routes for server.js to use.
module.exports = router;