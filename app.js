const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');
const loginRoutes = require('./api/routes/login');
// const elasticSearchRoutes = require('./api/routes/elasticsearch');

var mongoDB = 'mongodb://127.0.0.1/itproger';
mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:')); 

// mongoose.connect('mongodb://admingerman:' + process.env.MONGO_ATLAS_PW + '@localhost:27017/itproger', { useMongoClient: true });
/*
mongoose.connect('mongodb+srv://admingerman:' + process.env.MONGO_ATLAS_PW + '@node-rest-login-vnx8y.mongodb.net/itproger?retryWrites=true&w=majority', {
   useMongoClient: true 
});
*/
/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admingerman:"+ process.env.MONGO_ATLAS_PW +"@node-rest-login-vnx8y.mongodb.net/itproger?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("itproger").collection("users");
  // perform actions on the collection object
  client.close();
});
*/

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/users', userRoutes);
app.use('/login', loginRoutes);
// app.use('/search', elasticSearchRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

/* Basic Rest Api
app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});
*/

module.exports = app;