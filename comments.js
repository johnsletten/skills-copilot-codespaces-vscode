// Create Web Server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'comments.json');

// Read File
function readData() {
    try {
        var data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Write File
function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data));
}

// Middleware
app.use(bodyParser.json());

// Get Comments
app.get('/comments', function(req, res) {
    var data = readData();
    res.json(data);
});

// Add Comments
app.post('/comments', function(req, res) {
    var data = readData();
    data.push(req.body);
    writeData(data);
    res.json(data);
});

// Update Comments
app.put('/comments/:id', function(req, res) {
    var data = readData();
    var id = req.params.id;
    data[id] = req.body;
    writeData(data);
    res.json(data);
});

// Delete Comments
app.delete('/comments/:id', function(req, res) {
    var data = readData();
    var id = req.params.id;
    data.splice(id, 1);
    writeData(data);
    res.json(data);
});

// Start Server
app.listen(3000, function() {
    console.log('Server is running on 3000');
});