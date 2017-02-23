var fs = require("fs");
var app = require("../../app");

app.all = function(req,res,err){

	/*Basado en http://stackoverflow.com/questions/10011011/using-node-js-how-do-i-read-a-json-object-into-server-memory */
	var obj;

	fs.readFile('./public/data/tweets.json', 'utf8', function (err, data) {
   	if (data) obj = JSON.parse(data);
   	else obj = err;
   	res.send(obj);
   	});
};


app.mongo = function(req, res, err){

 	var obj;

 	fs.readFile('./public/data/tweets.json', 'utf8', function (err, data) {
   	if (data) obj = JSON.parse(data);
   	else obj = err;
   	});

 	/*Basado en http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/ */
	var insertTweets = function(db, callback) {
						  // Get the documents collection
						  var collection = db.collection('tweets');
						  // Insert some documents
						  collection.insertMany(obj, function(err, result) {
						    assert.equal(err, null);
						    assert.equal(20, result.result.n);
						    assert.equal(20, result.ops.length);
						    console.log("Inserted initial tweets");
						    callback(result);
						  });
						}

	var findTweets = function(db, callback) {
					  // Get the documents collection
					  var collection = db.collection('tweets');
					  // Find some documents
					  collection.find({}).toArray(function(err, docs) {
					  	assert.equal(err, null);
					    console.log("Finding records");
					    callback(docs);
					  });
					}

	var MongoClient = require('mongodb').MongoClient
  		   , assert = require('assert');


	// Connection URL
	var url = 'mongodb://localhost:27017/tweets';

  	var tweets;
	// Use connect method to connect to the server
	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  console.log("Connected successfully to server");
	  
	  findTweets(db, function(docs){
	  	if(docs.length != 0){
	  		tweets = docs;
	  		db.close();
			res.send(tweets);
	  	}
	  	else{
	  		insertTweets(db, function(){
	  			findTweets(db, function(docs){
	  				tweets = docs;
	  				db.close();
					res.send(tweets);

	  				});
	  		});
	  	}
	  });

	  
	});


};

module.exports = app;
