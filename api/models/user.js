const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthday: { type: String, required: true }
});

userSchema.plugin(mongoosastic, {
   hosts: [
     'localhost:9200'  
   ] 
});

module.exports = mongoose.model('User', userSchema);
/*
const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

mongoose.connect('mongodb://localhost:27017/mongosync');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthday: { type: String, required: true }
});

userSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

var User = mongoose.model('User', userSchema);

User.createMapping((err, mapping) => {
    console.log('mapping created');
});

var newUser = new User({
    name: 'german',
    email: 'isaevg@moia.gov.il',
    city: 'jerusalem'
});

newUser.save((err) => {
    if(err) {
        console.log(err);
    }
    console.log('user added in both the databases');
})

newUser.on('es-indexed', (err, result) => {
    console.log('indexed to elastic search');
});
*/
/*
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthday: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
*/