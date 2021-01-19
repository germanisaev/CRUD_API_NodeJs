const esClient = require('./client');

esClient.ping({
// ping usually has a 3000ms timeout
    requestTimeout: 3000
}, function (error) {
    if (error) {
        console.trace('Cannot connect to Elasticsearch!');
    } else {
        console.log('Connected to Elasticsearch was successful!');
    }
});