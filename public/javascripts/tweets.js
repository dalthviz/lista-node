var fs = require("fs");
var app = require("../../app");

app.all = function(req,res,err){

	/*Basado en http://stackoverflow.com/questions/10011011/using-node-js-how-do-i-read-a-json-object-into-server-memory*/
	var obj;

	fs.readFile('./public/data/tweets.json', 'utf8', function (err, data) {
   	if (data) obj = JSON.parse(data);
   	else obj = err;
   	res.send(obj);
   	});
};

module.exports = app;
