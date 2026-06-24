// Load the Express package
const express = require('express');

// Create an Express application
const app = express();

// Define the port number
const PORT = 3000;

// Home Route
app.get('/', function(req, res) {
    res.send('<h1>Updated! nodemon Works!</h1>');
});

// About Route
app.get('/about', function(req, res) {
    res.send('<h1>About Page</h1><p>This server is built with Node.js and Express.js</p>');
});

// Students Route
app.get('/students', function(req, res) {
    res.send('<h1>Students</h1><p>This page will show student data later!</p>');
});

// Start Server
app.listen(PORT, function() {
    console.log('Server is running at http://localhost:' + PORT);
    console.log('Press Ctrl + C to stop the server');
});
// Route 4: Contact Page
app.get('/contact', function(req, res) {
    res.send(`
        <h1>Contact Us</h1>
        <p>Name: Bhavana S. Padole</p>
        <p>Email: bhavanapadole@gmail.com</p>
        <p>College: Government Polytechnic Bramhpuri</p>
    `);
});

// Route 5: Courses Page
app.get('/courses', function(req, res) {
    res.send(`
        <h1>My Subjects</h1>
        <ul>
            <li>Data Structures</li>
            <li>Database Management System</li>
            <li>Computer Networks</li>
            <li>Operating Systems</li>
        </ul>
    `);
});

// Route 6: Dynamic Welcome Route
app.get('/welcome/:name', function(req, res) {

    let name = req.params.name;

    res.send('<h1>Welcome, ' + name + '!</h1>');

});