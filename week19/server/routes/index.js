var express = require('express');
var router = express.Router();
const fs = require('fs');
const unzip = require('unzip');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;