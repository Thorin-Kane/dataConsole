// var db = require('../db/database');
// var mongo = require('mongodb');

// exports.add = function(data, cb) {
//     var collection = db.get().collection('imagemodels');

//     collection.insert(data, function(err, docs) {
//         cb(err, docs);
//     });
// };
// exports.remove = function(id, cb) {
//     var collection = db.get().collection('imagemodels');

//     collection.remove({'_id': new mongo.ObjectID(id)}, {safe:true}, function(err, docs) {
//         cb(err, docs);
//     });
// }
// exports.all = function(cb) {
//     var collection = db.get().collection('imagemodels');

//     collection.find().toArray(function(err, docs) {
//         cb(err, docs);
//     });
// };

import db from '../db/database';
import mongo from 'mongodb';

export default class ImageModel {
    constructor() {
        this.collection = db.get().collection('imagemodels');
    }

    add(data, cb) {
        this.collection.insert(data, function(err, doc) {
            cb(err, docs);
        });
    }

    remove(id, cb) {
        this.collection.remove({'_id': new mongo.ObjectID(id)}, {safe:true}, function(err, docs) {
            cb(err, docs);
        });
    }

    get(cb) {
        collection.find().toArray(function(err,docs) {
            cb(err, docs);
        });
    }
}
