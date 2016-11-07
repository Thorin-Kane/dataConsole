import express from 'express';
import http from 'http';
import ejs from 'ejs';
import path from 'path';
import formidable from 'formidable';
import bodyParser from 'body-parser';
import db from './dev/static/js/db/database';

const app = express();

const HTTP_PORT = 8080;
const mongoUrl = 'mongodb://localhost:27017/test';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/static' , express.static(__dirname + '/dist/static/'));
app.use('/images', express.static('uploads'));

import router from './dev/static/js/controllers/routes_index';
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

app.route('*')
    .get(function (req, res) {
    res.render(__dirname + '/dist/index.ejs');
});

app.listen(HTTP_PORT, function() {
    console.log('Listening on %s', HTTP_PORT);
});
