var PouchDB = require('pouchdb');
var fs = require('fs');

var db = new PouchDB('food_db');
var testData;

db.allDocs({include_docs: true, descending: true}, function(err, doc) {
});
