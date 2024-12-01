// This is the framework that we use for our apllication 
// This the comands for this project 
// npm init
// npm install eexpress
// npm install mysql
// This is build on the Express.js Framework

//Start by importing  the express gramework

// Import the Express.js framework to create a web server
const express = require('express');
// Import the HTTPS module to create an HTTPS server
const https = require('https');
// Import the 'fs' (File System) module to read SSL certificate files
const fs = require('fs');
// Import the 'path' module to handle and transform file paths
const path = require('path');

// Create an instance of the Express application
const app = express();
// Import the database connection module (the file named 'database.js')
var connection = require("./database");
// Serve static files (e.g., CSS, images, JavaScript) from the current directory
app.use(express.static(__dirname));

// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

// SSL certificate and key ('key.pem' and 'cert.pem' with actual file paths)
const sslOptions = {
    key: fs.readFileSync('key.pem'),  // Read the private key for SSL
    cert: fs.readFileSync('cert.pem') // Read the certificate for SSL
};

// Route to handle GET requests to the root URL ('/')
app.get('/', function (req, res) {
    // Send the 'contact.html' file as a response
    res.sendFile(__dirname + "/contact.html");
});

// Create an HTTPS server using the SSL options and Express app
https.createServer(sslOptions, app).listen(3000, () => {
    // Log a message when the server is running
    console.log("HTTPS server running on port 3000");
});


// Route to handle form submissions
app.post('/submit', function(req, res) {
    // Extract form data from the request body
    const { first_name, last_name, phone, email, message } = req.body;

    // SQL query to insert form data into the 'messagesfromcontactus' table
    const sql = "INSERT INTO messagesfromcontactus (first_name, last_name, phone, email, anquerry) VALUES (?, ?, ?, ?, ?)";

    // Execute the SQL query with the form data
    connection.query(sql, [first_name, last_name, phone, email, message], function(err) {
        if (err) {
            console.error("Error inserting data:", err);
            res.send('<script>alert("Unable to send the information. Please try again later."); window.location.href = "/contact.html";</script>');
        } else {
            res.send('<script>alert("Message sent successfully!"); window.location.href = "/contact.html";</script>');
        }
    });
});

// // Start the server
// app.listen(3000, () => {
//     console.log('Server is running on https://localhost:3000');
// });

// 404 Error Handling Route
app.use((req, res) => {
    res.status(404).sendFile(__dirname + '/404.html');
});