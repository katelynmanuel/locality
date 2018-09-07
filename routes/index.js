var express = require('express');
var router = express.Router();
// Loading dotenv file. 
require('dotenv').config();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { 
    title: 'Express',
    creds: process.env
  });
});
module.exports = router;
