const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Login = require('../models/login');
const User = require('../models/user');

/*
Login.createMapping(function(err, mapping) {
    if(err) {
        console.log('error create mapping');
        console.log(err);
    } else {
        console.log('mapping created');
        console.log(mapping);
    }
});
*/

// Handle incoming GET requests to /login
router.get('/', (req, res, next) => {
    Login.find()
        .select('user active _id')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                login: docs.map(doc => {
                    return {
                        _id: doc._id,
                        user: doc.userId,
                        active: doc.active,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/login/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    User.findById(req.body.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            const login = new Login({
                _id: mongoose.Types.ObjectId(),
                active: req.body.active,
                user: req.body.userId
            });
            return login.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Login stored',
                createdLogin: {
                    _id: result._id,
                    user: result.user,
                    active: result.active
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/login/' + result._id
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
    res.status(201).json({
        message: 'Login was successfully',
        login: login
    });
    */
});

router.get('/:loginId', (req, res, next) => {
    res.status(200).json({
        message: 'Login details',
        loginId: req.params.loginId
    });
});

router.delete('/:loginId', (req, res, next) => {
    res.status(200).json({
        message: 'Login deleted',
        loginId: req.params.loginId
    });
});

module.exports = router;
