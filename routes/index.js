var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/resumes/search/:searchString', db.searchResumes);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
