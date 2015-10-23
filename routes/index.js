'use strict';

var express = require('express');
var router = express.Router();

import Flag from '../game/figures/Flag';

/* GET home page. */
router.get('/', function(req, res, next) {

  var flag = new Flag(1);
  console.log(flag.name);

  res.render('index', { title: 'Express' });


});

module.exports = router;
