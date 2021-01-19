// index.js
var elasticsearch = require('mongo-elasticsearch');
var t = new elasticsearch.Transfer({
    esOpts: {
        host: 'localhost:9200',
        log: 'trace'
    },
    esTargetType: 'tweet',
    esTargetIndex: 'twitter',
    mongoUri: 'mongodb://127.0.0.1/itproger',
    // mongoUri: 'mongodb://abc123:def456@myhost.com:27747/dbname',
    mongoSourceCollection: 'tweets'
});

t.start().then(function (results) {
    console.log('Exiting');
    console.log(results);
    process.exit();
});
/*
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    hosts: ['http://127.0.0.1:9200']
});

client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.error('Cannot connect to Elasticsearch.');
        console.error(error);

    } else {
        console.log('Connected to Elasticsearch was successful!');
    }
});
*/