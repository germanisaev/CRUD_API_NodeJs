const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

User.createMapping(function(err, mapping) {
    if(err) {
        console.log('Error create mapping');
        console.log(err);
    } else {
        console.log('Mapping created');
        console.log(mapping);
    }
});

/*
var stream = User.synchronize();
var count = 0;

stream.on('data', function() {
    count++;
});

stream.on('close', function() {
    console.log('Indexed ' + count + ' documents');
});

stream.on('error', function(err) {
    console.log(err);
});
*/
router.get('/', (req, res, next) => {
    User.find()
        .select('name age email password birthday')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs.map(doc => {
                    return {
                        name: doc.name,
                        age: doc.age,
                        email: doc.email,
                        passowrd: doc.passowrd,
                        birthday: doc.birthday,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/users/' + doc._id
                        }
                    }
                })
            };
            // console.log(docs);
            // if (docs.length >= 0) {
            res.status(200).json(response);
            /*
            } else {
                res.status(404).json({
                    message: 'No entries found'
                });
            }
            */
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    /*
    res.status(200).json({
        message: 'Handling GET requests to /users'
    });
    */
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        passowrd: req.body.passowrd,
        birthday: new Date(req.body.birthday)
    });
    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created user successfully',
                createdUser: {
                    name: result.name,
                    age: result.age,
                    email: result.email,
                    passowrd: result.passowrd,
                    birthday: result.birthday,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/users/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .select('name age email password birthday')
        .exec()
        .then(doc => {
            console.log('From database', doc);
            if (doc) {
                res.status(200).json({
                    user: doc,
                    request: {
                       type: 'GET' ,
                       description: 'Get all users',
                       url: 'http://localhost:3000/users'
                    }
                });
            } else {
                res.status(404).json({
                    message: 'No valid entry found for provided ID'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    /*
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
    */
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: { updateOps } })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Updated user!',
                request: {
                    type: 'GET' ,
                    url: 'http://localhost:3000/users/' + id
                 }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    /*
    res.status(200).json({
        message: 'Updated user!'
    });
    */
});

router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;

    User.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted user!',
                request: {
                    type: 'POST' ,
                    url: 'http://localhost:3000/users',
                    body: { name: 'String', age: 'Number', email: 'String', password: 'String', birthday: 'String' }
                 }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    /*
    res.status(200).json({
        message: 'Deleted user!'
    });
    */
});

module.exports = router;
