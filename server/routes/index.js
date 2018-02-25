'use strict';

var express = require('express');
var router = express.Router();
var data = [
  {
    id: 1000,
    image: 'http://carroecarros.com.br/wp-content/uploads/2017/06/Novo-Punto-2018-6.jpg',
    year: 2000,
    brandModel: 'VW Gol 1.6',
    plate: 'MPB-2011',
    color: 'Verde Musgo'
  },
  {
    id: 2000,
    image: 'https://http2.mlstatic.com/volkswagen-gol-quadrado-original-1995-D_NQ_NP_847295-MLB26588551602_012018-F.jpg',
    year: 1990,
    brandModel: 'VW Gol 1.0',
    plate: 'MAC-0001',
    color: 'Branco'
  }
];

router.get('/', function(req, res) {
  res.json(data);
});

router.post('/', function(req, res) {
  data.push({
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color 
  });
  res.json({ message: 'success' });
});

module.exports = router;
