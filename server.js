var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    ejs = require('ejs'),
    path = require('path'),
    fs = require('fs'),
    busboy = require('connect-busboy'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    EventGroup = require('./dev/static/js/models/EventSchema'),
    EventSchema = require('./dev/static/js/models/CollectionSchema'),
    ImageModel = require('./dev/static/js/models/ImageSchema');

var HTTP_PORT = 8080,
    UPLOAD_CONNECTION_ID;
var EventCollection = mongoose.model('EventGroup');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongodb url
var url = 'mongodb://localhost:27017/test';

mongoose.connect(url, function (err, db){
    console.log("Connected correctly to Mongo server.");
});

/////////////////////////////////////
//API ROUTES
////////////////////////////////////
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
};

var router = express.Router();
router.use(function (err, req, res, next) {
    if (err) {
        handleError(res, err, "Something broke!");
    }
    next();
});

router.route('/data')
    .get(function (req, res) {
        // EventGroup.findAll(function (err, eventgroup) {
        //     if(err) {
        //         throw err
        //     } else {
        //         res.status(200).json(eventgroup);
        //     }
        // });
        EventGroup.find({})
            .populate('backgroundImage')
            .exec(function(err, eventgroup) {
                res.status(200).json(eventgroup);
            })
    })
    .post(function (req, res) {
        EventGroup.create(req.body, function (err, eventgroup) {
            if(err) {
                handleError(res, err, "Failed to put new eventgroup", 400);
            } else {
                res.status(200).json(eventgroup);
            }
        })
    });
//get, update, delete a specific event group
router.route('/data/:eventgroup_id')
    //get evnetgroup by id
    .get(function (req, res) {
        EventGroup.findOne(req.params.eventgroup_id, function(err, eventgroup) {
            if(err) {
                handleError(res, err, "Failed to get specific event group", 404);
            } else {
                res.status(200).json(eventgroup);
            }
        })
    })
    //delete an eventgroup
    .delete(function (req, res) {
        EventGroup.remove({
            _id: req.params.eventgroup_id
        }, function (err, eventgroup) {
            if (err) {
                handleError(res, err, "Failed to delete eventgroup");
            } else {
                res.sendStatus(200);
            }
        });
    });

router.route('/data/events/:eventgroup_id')
    //add an event to the eventgroup
    .put(function (req, res) {
        EventGroup.createEvent(req.params.eventgroup_id, req.body, function (err, eventgroup) {
            if(err) {
                handleError(res, err, "Failed to create event", 400);
            }
                res.status(200).json(eventgroup);
            }
        );
    });
router.route('/data/events/:eventgroup_id/:event_id')
    //delete an event from the group
    .delete(function (req, res) {
        EventGroup.update({_id: req.params.eventgroup_id}, {$pull: {events: {_id: req.params.event_id}}},
            function (err, eventgroup) {
                if(err) {
                    res.sendStatus(400);
                    console.log(err);
                }
                res.sendStatus(200);
            });
    });
//////////////////////////////////
//API Routes for managing schemas
////////////////////////////////
router.route('/schema')
    .get(function (req, res) {
        EventSchema.find(function (err, data ) {
            if(err) {
                handleError(res, err, "Failed to get event schema data", 404);
            } else {
                res.status(200).json(data);
            }
        });
    })
    .post(function (req, res) {
        var eventSchema = new EventSchema(req.body);
        eventSchema.save(function (err) {
            if (err) {
                handleError(res, err, "Failed to post new event manager schema.", 400);
            } else {
                res.sendStatus(200);
            }
        });
    })
router.route('/schema/:schema_id')
    .get(function (req, res) {
        EventSchema.find({_id: req.params.schema_id}, function (err, schema) {
            if(err) {
                handleError(res, err, "Failed to get specific schema", 404);
            } else {
                res.status(200).json(schema);
            }
        });
    })
    .delete(function (req, res) {
        EventSchema.remove({
            _id: req.params.schema_id
        }, function (err, schema) {
            if (err) {
                handleError(res, err, "Failed to delete schema", 400);
            } else {
                res.sendStatus(200);
            }
        });
    });
//add/remove properties to the major group
router.route('/schema/group/:schema_id')
    //add a field to the group schema
    .put(function (req, res) {
        console.log(req.body);
        EventSchema.findByIdAndUpdate({_id: req.params.schema_id},
            {$push: {"GroupProperties": req.body}},
            {safe: true, upsert: true, new: true},
            function (err, groupSchema) {
                if(err) {
                    handleError(res, err, "Failed to add new prop to group", 404);
                } else {
                    res.status(200).json(groupSchema);
                }
            }
        );
    });
router.route('/schema/group/:schema_id/:group_id')
    .delete(function (req, res) {
        EventSchema.update({_id: req.params.schema_id},
            {$pull: {GroupProperties: {_id: req.params.group_id}}},
            function (err, groupSchema) {
                if(err) {
                    handleError(res, err, "Failed to remove prop from group", 400);
                }
                res.sendStatus(200);
            });
    });
//add new properties to the sub group
router.route('/schema/subgroup/:schema_id')
    .put(function (req, res) {
        EventSchema.findByIdAndUpdate({_id: req.params.schema_id},
            {$push: {"SubGroupProperties": req.body}},
            {safe: true, upsert: true, new: true},
            function ( err, subGroupSchema){
                if(err) {
                    handleError(res, err, "Failed to add new prop to sub group", 404);
                } else {
                    res.status(200).json(subGroupSchema);
                }
            }
        )
    });
router.route('/schema/subgroup/:schema_id/:subGroup_id')
    .delete(function (req, res) {
        EventSchema.update({_id: req.params.schema_id},
            {$pull: {SubGroupProperties: {_id: req.params.subGroup_id}}},
            function (err, subGroupSchema) {
                if(err) {
                    handleError(res, err, "Failed to remove prop from sub group", 400);
                }
                res.sendStatus(200);
            });
    });

router.route('/image/file/:name')
    .get(function (req, res) {
        res.sendFile(__dirname + '/uploads/' + req.params.name);
    });

router.route('/image')
    .get(function (req, res) {
        ImageModel.findAll(function (err, images) {
            if(err) {
                handleError(res, err, "Failed to get list of images", 400);
            } else {
                res.status(200).json(images);
            }
        });
    })
    .post(function (req, res) {
        ImageModel.create(req.body, function (err, image) {
            if(err) {
                handleError(res, err, "failed to put new image data", 400);
            } else {
                res.status(200).json(image);
            }
        })

    });
app.use('/api', router);

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

http.listen(HTTP_PORT, function() {
    console.log('data console listening on port %s', 8080 );
});
