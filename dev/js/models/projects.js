var db = require('../db/database'),
    mongo = require('mongodb');

exports.new = function(data, cb) {
    //here we want to insure that we have a schema and data array, intialized to empy
    var collection = db.get().collection('projects');

    collection.insert(data, function(err, docs) {
        cb(err, docs);
    })
};

exports.removeProject = function(id, cb) {
    var collection = db.get().collection('projects');

    collection.remove({'_id': new mongo.ObjectID(id)}, {safe:true}, function(err, docs) {
        cb(err, docs);
    });
};

exports.get = function(cb) {

};

exports.add = function(id, newData, cb) {
    //need to create an id for each new data object in array
    var collection = db.get().collection('projects');

    collection.update({
        { '_id': 1 },
        { $push: {data: newData} }
    });
};

exports.removeData = function(id, cb) {
    collection.update({
        { _id: 1 },
        { $pull: {data : {'_id': new mongo.ObjectId(id)}} },
        {safe:true},
        function (err, docs) {
            cb(err,docs);
        }
    });
}
