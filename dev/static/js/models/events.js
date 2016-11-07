import db from '../db/database';
import mongo from 'mongodb';

export default class EventModel {
    constructor() {
        this.collection = db.get().collection('events');
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
