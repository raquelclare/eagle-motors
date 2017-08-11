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
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);

//set port
var port = process.env.PORT || 3000;

//set express to variable app in order to call it
var app = express();

app.use(cookieParser());
// Serve static content for the app from the "public" directory in the application directory
app.use(express.static("public"));

var options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'enicmoeinciamowenive',
  store: sessionStore,
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

passport.use(new LocalStrategy(
  function(username, password, done) {
  	console.log(username);
  	console.log(password);
  	const db = require("./config/connection.js");

  	db.query("SELECT password FROM admins WHERE username = ?", [username], function(err, results, fields) {
  		if(err) {done(err)};

  		if(results.length === 0) {
  			done(null, false);
  		}
  		return done(null, "s;lkeaf");
  	});
  }
)); 

app.listen(port, function() {
  console.log("App listening on port " + port);
  //console.log("Passport: ", passport);
});