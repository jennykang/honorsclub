var express = require('express');
var app = express();

var PouchDB = require('pouchdb');
var fs = require('fs');

var db = new PouchDB('food_db');
var testData;

app.get('/getRandom', function(req, res) {
	// Req param: req.params.		
});

app.get('/getByCriteria', function(req, res) {
	// Req params: 
});

app.get(8001, function() {
	console.log('Running on NodeJS');	
});

app.get 
