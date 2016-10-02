import data_source from './test.json'

class Recipe {
	constructor(item) {
		this.id = item.id;
		this.cuisine = item.cuisine;
		this.ingredients: item.ingredients;
	}
}

data_source.forEach(function(item) {
	skygear.publicDB.save(new Recipe(item))
	.then((record) => {
		console.log(record.id);
	}), (error) => {
		console.error(error);
	}
});
