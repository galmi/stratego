'use strict';

var express = require('express');
var router = express.Router();

import Flag from '../game/classes/Flag';

/* GET home page. */
router.get('/', function(req, res, next) {

  var flag = new Flag();
  console.log(flag.name);

  res.render('index', { title: 'Express' });


});

module.exports = router;
