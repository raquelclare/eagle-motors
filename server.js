var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var passport = require("passport"), LocalStrategy = require("passport-local").Strategy;

//set port
var port = process.env.PORT || 3000;

//set express to variable app in order to call it
var app = express();

// Serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/cars_controller.js");

app.use("/", routes);

//initializin passport
passport.initialize();

//set up passport strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.listen(port, function() {
  console.log("App listening on port " + port);
  //console.log("Passport: ", passport);
});