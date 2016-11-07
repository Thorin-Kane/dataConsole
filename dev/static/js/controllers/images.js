// var images = require('../models/images'),
//     express = require('express'),
//     path = require('path'),
//     fs = require('fs'),
//     formidable = require('formidable'),
//     router = express.Router();

// router.post('/images', function(req, res) {
//     images.add(req.body, function(err, docs) {
//         res.status(200).json(docs);
//     })
// });

// router.delete('/images/:id', function(req, res) {
//     images.remove(req.params.id, function(err, docs) {
//         if(!err){
//             res.status(200).json(docs);
//         } else {
//             res.status(204);
//         }
//     })
// });

// router.get('/images', function(req, res) {
//     images.all(function(err, docs) {
//         res.status(200).json(docs);
//     })
// });

// module.exports = router;

import ImageModel from '../models/images';
import express from 'express';
import path from 'path';
import fs from 'fs'
import formidable from 'formidable';
// import express from 'express';

const router = express.Router();
const imageModel = new ImageModel();

router.post('/images', function(req, res) {
    imageModel.add(req.body, function(err, docs) {
        res.status(200).json(docs);
    })
});

router.delete('/images/:id', function(req, res) {
    imageModel.remove(req.params.id, function(err, docs) {
        if(!err){
            res.status(200).json(docs);
        } else {
            res.status(204);
        }
    })
});

router.get('/images', function(req, res) {
    imageModel.all(function(err, docs) {
        res.status(200).json(docs);
    })
});

export default router;
