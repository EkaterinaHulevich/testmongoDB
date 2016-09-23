var user = require('./data1.json')
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	var collection = db.collection('documents');
	collection.remove({});
	collection.insertMany(user);
    collection.find({}).toArray(function(err, items) {
		assert.equal(null, err);
		assert.equal(3, items.length);

		for (var i = 0; i < items.length; i++) {
			console.log(items[i]);
		}
    });
	collection.remove({orderID: 1});
	collection.find({}).sort( { "orderID": -1} ).toArray(function(err, item) {
		assert.equal(null, err);
		assert.equal(2, item.length);
		var jsonfile = require('jsonfile');
		var file = './output.json'
		jsonfile.writeFileSync(file, item, {spaces: 2});	
    });
	db.close();
  
});













	
	