'use strict';

/**
 * Vehicle Routes
 * Handles CRUD operations for vehicle inventory
 */

var express = require('express');
var router = express.Router();

// In-memory storage (in production, this would be a database)
var lastID = 500;
var data = [];

/**
 * GET /car
 * Retrieve all vehicles in inventory
 */
router.get('/', function(req, res) {
  res.json(data);
});

/**
 * POST /car
 * Add a new vehicle to inventory
 */
router.post('/', function(req, res) {
  data.push({
    id: ++lastID,
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color
  });
  res.json({ message: 'success' });
});

/**
 * DELETE /car
 * Remove a vehicle from inventory by license plate
 */
router.delete('/', function(req, res) {
  data = data.filter(function(car) {
    return car.plate !== req.body.plate;
  });
  res.json({ message: 'success' });
});

module.exports = router;
