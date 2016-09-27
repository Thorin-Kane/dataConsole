var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SubGroupProperties = new Schema({
	field: String,
	label: String,
	type: String,
	defaultValue: String
});
var GroupProperties = new Schema({
	field: String,
	label: String,
	type: String,
	defaultValue: String
});
var RootSchema = new Schema({
	pageName: String,
	itemName: String,
	GroupProperties: [GroupProperties],
	SubGroupProperties: [SubGroupProperties]
});

var CollectionSchema = mongoose.model('CollectionSchema', RootSchema);
module.exports = CollectionSchema;