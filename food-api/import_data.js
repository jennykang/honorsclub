var PouchDB = require('pouchdb');
var fs = require('fs');

var db = new PouchDB('food_db');
var testData;

var dbCount;

db.info().then(function (result) {
  // handle result
  dbCount = result.doc_count;
}).catch(function (err) {
  console.log(err);
});

if(dbCount>0) {
	db.destroy();
}

fs.readFile('test.json', 'utf-8', function(err, data) {
	if (err) throw err;
	testData = JSON.parse(data);
	console.log(testData);
	testData.forEach(function(item) {
		db.post(item, function(err, result) {
			if (err) throw err;
			console.log('success');
		});
	});
});


