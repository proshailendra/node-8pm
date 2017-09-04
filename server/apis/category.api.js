const express = require('express');
const httpStatus = require('http-status-codes');
const router = express.Router();

const category = require('../models/category');

router.get('/', (req, res) => {
    category.find({}).then((docs) => {
        res.status(httpStatus.OK).send(docs);
    }).catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('INTERNAL_SERVER_ERROR');
    });
}).get('/:id', (req, res) => {
    let id = req.params.id;
    category.findById(id).then((doc) => {
        res.status(httpStatus.OK).send(doc);
    }).catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('INTERNAL_SERVER_ERROR');
    });
}).post('/', (req, res) => {
    let body = req.body;
    let obj = new category(body);
    obj.save().then(() => {
        res.status(httpStatus.OK).send('created');
    }).catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('INTERNAL_SERVER_ERROR');
    });
}).put('/:id', (req, res) => {
    let body = req.body;
    let id = req.params.id;
    category.findByIdAndUpdate(id, { name: body.name, description: body.description }).then(() => {
        res.status(httpStatus.OK).send('updated');
    }).catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('INTERNAL_SERVER_ERROR');
    });
}).delete('/:id', (req, res) => {
    let id = req.params.id;
    category.findByIdAndRemove(id).then(() => {
        res.status(httpStatus.OK).send('deleted');
    }).catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('INTERNAL_SERVER_ERROR');
    });
});

module.exports = router;