var PouchDB = require('pouchdb');
var fs = require('fs');

var db = new PouchDB('food_db');
var testData;

var N = db.info().doc_count;

var skip = Math.random(N);

db.allDocs({include_docs: true, descending: true, skip: N, limit: 1}, function(err, doc) {
});
