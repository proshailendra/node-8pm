const express = require('express'),
    mongoose= require('mongoose'),
    httpStatus = require('http-status-codes');

const router = express.Router();

const user = require('../models/user');
const role = require('../models/role');

router.get('/', (req, res) => {
    user.find((err, docs) => {
        if (err) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
            console.log(err);
        }
        else
            res.status(httpStatus.OK).json(docs);
    });
});
router.get('/:id', (req, res) => {
    let id = req.params.id;
    user.findById(id, (err, doc) => {
        if (err)
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
        else
            res.status(httpStatus.OK).json(doc);
    });
});
router.post('/', (req, res) => {
    let data = req.body; //role for assiggning role

    const obj = new user(data);
    role.findOne({ name: data.role }, (err, r1) => {
        if (err)
            res.status(httpStatus.INTERNAL_SERVER_ERROR);
        else {
            obj.roles.push(r1); //assigning role
            obj.save().then(() => {
                let _id = mongoose.Types.ObjectId(obj._id);
                r1.users.push(_id); //adding user to role document
                role.findByIdAndUpdate(r1._id, { users: r1.users }).then(() => {
                     res.status(httpStatus.CREATED).json('created');
                }).catch((err) => {
                     res.status(httpStatus.INTERNAL_SERVER_ERROR).json('error');
                });
            }).catch((err) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).json('error');
            });
        }
    });
});
router.put('/:id', (req, res) => {
    let data = req.body;
    let id = req.params.id;

    user.findByIdAndUpdate(id, { name: data.name, address: data.address }, (err) => {
        if (err)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json('error');
        else
            res.status(httpStatus.OK).json('updated');
    });
});
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    user.findByIdAndRemove(id, (err) => {
        if (err)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json('error');
        else
            res.status(httpStatus.OK).json('deleted');
    });
});
module.exports = router;