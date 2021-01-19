
/*
const elasticsearch = require('elasticsearch'),

const index = "elastic_index_users";
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

module.exports.elasticSearchClient = client;

module.exports.elasticSearchConfig = {
    index: index
};
*/

const mongoose     = require('mongoose');
const mongoosastic = require('mongoosastic');

mongoose.connect('mongodb://localhost:27017/itproger');
 
var UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    birthday: String
});

UserSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

var User = mongoose.model('user', UserSchema);

User.createMapping((err, mapping) => {
    if(err) {
        console.log('Cannot connect to Elasticsearch');
        console.log(err);
    } else {
        console.log('Connected to Elasticsearch was successful');
        console.log(mapping);
    }
});

var newUser = new User({
    name: 'Daniel',
    age: 48,
    email: 'danielt@moia.gov.il',
    password: 'Dd123456',
    birthday: new Date('1971-05-23')
});

newUser.save((err) => {
    if(err) {
        console.log(err);
    }
    console.log('user added in both the databases');
});

newUser.on('es-indexed', (err, result) => {
    console.log('indexed to elastic search');
});
