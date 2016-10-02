var express = require('express');
var app = express();

var PouchDB = require('pouchdb');
var fs = require('fs');

var db = new PouchDB('food_db');
var testData;

app.get('/getRandom', function(req, res) {
	// Req param: req.params.		
	var N = db.info().doc_count;

	var skip = Math.random(N);

	db.allDocs({include_docs: true, descending: true, skip: N, limit: 1}, function(err, doc) {
	});
});

app.get('/getByCriteria', function(req, res) {
	// Req params: 
});

app.get(8001, function() {
	console.log('Running on NodeJS');	
});
