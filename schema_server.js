var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    ejs = require('ejs'),
    path = require('path'),
    fs = require('fs'),
    busboy = require('connect-busboy'),
    bodyParser = require('body-parser'),
    db = require('./static/js/db/database');

//server port
var HTTP_PORT = 8080;
//mongodb url
var  mongoUrl = 'mongodb://localhost:27017/test';
//api routes url
var apiUrl = 'http://localhost:8080/api/v1';
//router
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/////////////////////////////////////
//API ROUTES
////////////////////////////////////
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
};

router.use(function (err, req, res, next) {
    if (err) {
        handleError(res, err, "Something broke!");
    }
    next();
});

db.connect(url, function (err, db) {
    if(!err) {
        console.log("Successfully connect to MongoDb instance at port: 27017/ db: test");
        app.listen(HTTP_PORT, function() {
            console.log('data console listening on port %s', HTTP_PORT);
        });
    } else {
        console.log("unable to connect to mongo, exiting");
        process.exit(1);
    }
});

app.use('/api/v1', router);
////////////////////////////
//Start server
///////////////////////////
//set view engine to ejs
app.set('view engine', 'ejs');
app.use(busboy());
app.use('/static' , express.static(__dirname + '/dist/static/'));
app.use('/images', express.static('uploads'));

app.route('/upload')
    .post(function (req, res, next) {
        var fstream;
        var NewEvent;
        req.pipe(req.busboy);
        req.busboy.on('field', function (fieldName, value) {
            NewEvent[fieldName] = value;
            console.log(fieldName, value);
        });
        req.busboy.on('file', function (field, file, filename) {
            var dest = path.join(__dirname, '/uploads/', filename);

            fstream = fs.createWriteStream(__dirname +'/uploads/'+filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log('Upload finished: ' + filename);
                res.sendStatus(200);
            });

        });
        req.busboy.on('finish', function (err, next) {
            console.log('finished');
        });
    });


// main page, rendered for all routes
app.route('*')
    .get(function (req, res) {
    res.render(__dirname + '/dist/index.ejs');
});

app.listen(8080, function() {
    console.log('data console listening on port %s', 8080 );
});
