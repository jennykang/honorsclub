var express = require('express');
var app = express();

var PouchDB = require('pouchdb');
var fs = require('fs');

var db = new PouchDB('food_db');
var testData;

app.get('/', function(req, res) {
	// var received = 'empty';
	// var printData = function() {
	// 	res.send(received);
	// }
	// Req param: req.params.
	var N = 0, skip;		
	db.info().then(function(result) {
		N = result.doc_count;
		skip = Math.floor(Math.random()*(N+ 1));
		console.log(skip);
	}).then(function() {
		var options = {include_docs: true, descending: true, skip: skip, limit: 1};
		db.allDocs(options).then(function (result) {
		  // handle result
		  var ingredients = result.rows[0].doc.ingredients;
		  var processed = {
		  	ingredients: ingredients,
		  	name: ingredients[Math.floor(Math.random()*ingredients.length)]+' '+ingredients[Math.floor(Math.random()*ingredients.length)]
		  }
		  res.send(processed);
		}).catch(function (err) {
		  console.log(err);
		});
	});
});

app.get('/getByCriteria', function(req, res) {
	// Req params: 
});

app.listen(3000, function() {
	console.log('Running on NodeJS');	
});
