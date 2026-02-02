'use strict';

/**
 * Vehicle Inventory API Server
 * Express.js server providing RESTful endpoints for vehicle management
 */

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var routes = require('./routes');

// Middleware configuration
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Health check endpoint
app.get('/', function(req, res) {
  res.json({ message: 'Vehicle Inventory API is running' });
});

// Vehicle management routes
app.use('/car', routes);

// Start server
app.listen(port, function() {
  console.log('Vehicle Inventory API listening on http://localhost:%d', port);
});
