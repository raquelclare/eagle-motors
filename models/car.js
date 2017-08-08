// Import the orm to create functions that will interact with the database
var orm = require("../config/orm.js");

var car = {
  selectAll: function(cb) {
    orm.selectAll("cars", function(res) {
      cb(res);
    });
  },
  insertOne: function(cols, vals, cb) {
    orm.insertOne("cars", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("cars", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("cars", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller
module.exports = car;