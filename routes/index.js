var express = require('express');
var router = express.Router();

/*/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
// index page
router.get('/index', function(req, res, next) {
    res.render('pages/index');
});

module.exports = router;
