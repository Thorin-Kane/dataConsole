// var mongoClient = require('mongodb').MongoClient;

// var state = {
//     db: null,
// }

// exports.connect = function(url, done) {
//     //if db is not null
//     if (state.db) {
//         return done()
//     } else {
//         mongoClient.connect(url, function(err, db) {
//             if (err) {
//                 return done(err)
//             } else {
//                 state.db = db
//                 done()
//             }
//         });
//     }
// }

// exports.get = function() {
//     return state.db
// }

// exports.close = function(done) {
//     if (state.db) {
//         state.db.close(function(err, result) {
//             state.db = null
//             state.mode = null
//             done(err)
//         })
//     }
// }

import mongodb from 'mongodb';
const mongoClient = mongodb.MongoClient;

export default class Db {
    static _this = null;
    static getInstance() {
        if(!Db._this) {
            Db._this = new Db();
        }
    }

    constructor() {
        this.db = null;
    }

    connect(url, done) {
        if(this.db) {
            return done();
        } else {
            MongoClient.connect(url, function(err, db) {
                if(!err) {
                    this.db = db;
                } else {
                    return done(err);
                }
            });
        }
    }

    get() {
        return this.db;
    }

    close() {
        if(this.db) {
            this.db.close(function(err, db) {
                this.db = null;
                done(err);
            });
        }
    }
}
