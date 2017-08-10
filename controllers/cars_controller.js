//requre express and the cars model
var express = require("express");
var car = require("../models/car.js");
var passport = require("passport"), LocalStrategy = require("passport-local").Strategy;

//initialize passport
passport.initialize();

//set up passport strategy
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));
passport.use(new LocalStrategy ({
  usernameField: "email",
  passwordField: "passwd",
  // session: false
},
  function(username, password, done) {
    // return done(usernameField)
    console.log("wooooo");
  }
));

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

//new user registration
router.post("/register", function(req, res, next) {
    car.selectAll(function(data) {
    var hbsObject = {
      cars: data
    };
    //console.log("object: ", hbsObject);
    res.render("admin.handlebars", hbsObject);
    console.log("New admin added");
  });
});

//post request for login information
router.post("/login",
  passport.authenticate("local"),
  function(req, res) {
    console.log("req: ", req.body);
  }
);
// failureFlash: true

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