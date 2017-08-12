//requre express and the cars model
var express = require("express");
var car = require("../models/car.js");
var passport = require("passport");
var expressValidator = require("express-validator");

//bcrypt package to hash passwords
var bcrypt = require('bcrypt');
var saltRounds = 10;

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

//login page
router.post("/login", passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/login"
}));

//new admin registration page
router.get("/new-admin", function(req, res) {
  res.render("new-admin.handlebars", { title: "Add New Admin" });
});

//new admin registration
router.post("/new-admin", function(req, res, next) {

  //form validation from express validator
  req.checkBody("username", "Username field cannot be empty").notEmpty();
  req.checkBody("username", "Username must be between 4-15 characters long.").len(4, 15);
  req.checkBody("password", "Password must be between 8-100 characters long.").len(8, 100);
  req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
  req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
  req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);

  var userErrors = [];

  req.getValidationResult().then(function(result){
    var errors = result.mapped();

    if (!result.isEmpty()) {
      userErrors.push(errors);
      
      res.render("new-admin.handlebars", {
        title: "Admin Registration Error",
        userErrors: userErrors
      });
      return;
    } else {
      var username = req.body.username;
      var password = req.body.password;

      var db = require("../config/connection.js");

      //wrapping query funciton inside bcrypt function to hash and salt passwords as they're entered
      bcrypt.hash(password, saltRounds, function(err, hash) {
        db.query("INSERT INTO admins (username, password) VALUES (?, ?)", [username, password], function(error, results, fields) {
          if (error) throw error;

          db.query("SELECT LAST_INSERT_ID() as user_id", function(error, results, fields) {
            if (error) throw error;

            const user_id = results[0];

            req.login(user_id, function(err) {
              res.redirect("/admin");
            }); 
          });
        });
      });
    }
  });
});

//admin site
router.get("/admin", authenticationMiddleware(), function(req, res) {
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

//passport session
passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
});

function authenticationMiddleware() {  
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

      if (req.isAuthenticated()) return next();
      res.redirect("/login")
  }
}

// Export routes for server.js to use.
module.exports = router;