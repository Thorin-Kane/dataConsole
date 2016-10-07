var mongoClient = require('mongodb').MongoClient;

//mongodb url
var url = 'mongodb://localhost:27017/test';

var state = {
  db: null,
}

exports.connect = function(url, done) {
    //if db is not null
    if (state.db) {
        return done()
    } else {
        mongoClient.connect(url, function(err, db) {
            if (err) {
                return done(err)
            } else {
                state.db = db
                done()
            }
        });
    }
}

exports.get = function() {
    return state.db
}

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
}
