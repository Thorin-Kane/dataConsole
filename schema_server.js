var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    ejs = require('ejs'),
    path = require('path'),
    fs = require('fs'),
    formidable = require('formidable'),
    bodyParser = require('body-parser'),
    db = require('./dev/js/db/database');

//server port
var HTTP_PORT = 8080;
//mongodb url
var  mongoUrl = 'mongodb://localhost:27017/test';
//api routes url
var apiUrl = 'http://localhost:8080/api/v1';


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/static' , express.static(__dirname + '/dist/'));
app.use('/static', express.static(__dirname + '/dev/resources'));
app.use('/images', express.static('uploads'));

//bring in routes file with all controllers
var router = require('./dev/js/controllers/routes_index');
app.use('/api/v1', router);

//Connect to mongo instance
db.connect(mongoUrl, function (err, db) {
    if(!err) {
        console.log("Successfully connect to MongoDb instance at port: 27017/ db: test");
    } else {
        console.log("unable to connect to mongo, exiting");
        process.exit(1);
    }
});

router.route('/upload')
    .post(function (req, res) {
        var form = new formidable.IncomingForm();
        form.multiples = true;
        form.uploadDir = path.join(__dirname, '/uploads');

        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name))
        });

        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });

        form.on('end', function() {
            res.end('success');
        });

        form.parse(req);
    });

router.route('/upload/:name')
    .delete(function(req, res) {
    var imagePath = path.join(__dirname, '/uploads/' + req.params.name);

    fs.unlink(imagePath, function() {
        res.status(204)
    });
});

// main page, rendered for all routes
app.route('*')
    .get(function (req, res) {
    res.render(__dirname + '/index.ejs');
});

app.listen(HTTP_PORT, function() {
    console.log('data console listening on port %s', HTTP_PORT);
});
