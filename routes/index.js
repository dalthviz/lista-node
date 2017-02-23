var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /* Basado en https://quizzpot.com/blog/como-realizar-una-peticion-http-en-node-js*/
    var headers = {
    'Content-Type': 'application/json'
	};

  var options = {
    url     : 'http://localhost:3000/data/mongo',
    method  : 'GET',
    headers : headers
	};
  
  request(options, function (error, response, body) {
  	body = JSON.parse(body);
  	if (!error && response.statusCode == 200) res.render('index', { title: 'Lista de tweets' , tweets: body});
    else res.send(error);
	});
  
});

module.exports = router;
