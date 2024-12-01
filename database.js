// import the MySQL module

var mysql = require("mysql2");

// Define the connection using the information from mysql db

var connection = mysql.createConnection({
    // This is the db information
    host: "localhost",

    // DB name, user and password
    database: "mysql_db",
    user: "root",
    password: "Dublin123*"   

})

module.exports = connection;
