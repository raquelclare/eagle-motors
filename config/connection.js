// Set up MySQL connection.
var mysql = require("mysql");

//connect to either JawsDB or MySQL local database
// if (process.env.JAWSDB_URL) {
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "root",
//     database: "cars_db"
//   });
// }

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 8889,
  password: "root",
  database: "cars_db"
  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

//test connection to car_admin database
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

// Export connection for our ORM to use.
module.exports = connection;
// console.log(connection);