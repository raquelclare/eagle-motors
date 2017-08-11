var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var cookieParser = require("cookie-parser");

//require env package to utilize .env file
require("dotenv").config();

//authentication packages
var session = require("express-session");
var passport = require("passport");

//set port
var port = process.env.PORT || 3000;

//set express to variable app in order to call it
var app = express();

app.use(cookieParser());
// Serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

app.use(session({
  secret: 'enicmoeinciamowenive',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}))  
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({ extended: false }));
//express validator, which must be right below body parser middleware
app.use(expressValidator()); //this line must be directly after bodyParser

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/cars_controller.js");

app.use("/", routes);

app.listen(port, function() {
  console.log("App listening on port " + port);
  //console.log("Passport: ", passport);
});