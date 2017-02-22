var express = require('express');
var router = express.Router();
var tweets = require('../public/javascripts/tweets');

/* GET users listing. */
router.get('/', tweets.all);

module.exports = router;
