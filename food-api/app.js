var express = require('express');
var app = express();

var PouchDB = require('pouchdb');
var fs = require('fs');

var db = new PouchDB('food_db');
var testData;

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

function generateRecipeSentence(five_i) {
	class randomTerm {
		constructor(source) {
			this.data = source;
		}

		getRand() {
			return this.data[Math.floor(Math.random() * (this.data.length-1))];
		}
	}



	var verbs_raw = [
		'Cook',
		'Fry',
		'Add',
		'Use',
		'Whisk',
		'Cut',
		'Drain',
		'Simmer'
	];

	var adverb_raw = [
		'until',
		'after',
		'before',
		'when'
	];

	var states_raw = [
		'dry',
		'wet',
		'cooking',
		'seasoning',
		'done'
	];

	var Verbs = new randomTerm(verbs_raw);
	var Adverb = new randomTerm(adverb_raw);
	var States = new randomTerm(states_raw);

	return Verbs.getRand()+' the '+five_i.pop()+' '+Adverb.getRand()+' '+States.getRand()+'.';
}

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
		  var whetherSuitable = ['just for you','out of your league'];
		  var ingredients = result.rows[0].doc.ingredients;
		  var unique_i = ingredients.getUnique();
		  var fiveIn = function() {
		  	var arr = [];
		  	for(var i=0; i<5; i++){
		  		arr.push(unique_i[Math.floor(Math.random()*unique_i.length)]);
		  	}
		  	return arr;
		  }
		  var processed = {
		  	ingredients: ingredients,
		  	name: unique_i[Math.floor(Math.random()*unique_i.length)]+' '+unique_i[Math.floor(Math.random()*unique_i.length)],
		  	suitable: whetherSuitable[Math.floor(Math.random()*2)],
		  	recipe: generateRecipeSentence(fiveIn())+' '+generateRecipeSentence(fiveIn())
		  }
		  res.send(processed);
		}).catch(function (err) {
		  console.log(err);
		});
	});
});

app.get('/:field/:value', function(req, res) {
	// Req params: field, value
	var _field = req.params.field;
	var _value = req.params.value;
	var options = {include_docs: true, descending: true};
	db.allDocs(options).then(function (result) {
		var filtered = [];
		result.rows.forEach(function(row){
			if(row[_field] == _value){
				filtered.push(row);
			}
		});
		res.send(filtered);
	}).catch(function (err) {
	  console.log(err);
	});
});

app.listen(3000, function() {
	console.log('Running on NodeJS');	
});
