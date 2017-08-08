// ====== DEPENDENCIES =========================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// Requiring our models for syncing
var db = require("./models");

// Setting up the Express app
var app = express();

// Serve static content for the app from the "public" directory in the application
app.use(express.static(__dirname + "./public"));

// Body Parser
// Setting up Express app to handle data parsing
// app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Method Override 
// Overrides with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give server access to them
var routes = require("./controllers/cars_controller.js");

app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
var PORT = process.env.PORT || 8080;
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});