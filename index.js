var cluster = require('cluster');
var app = require('./app/app');

var max_instances = require('os').cpus().length;

cluster.setupMaster({
    exec: './app/index.js'
});

for (var i = 0; i < max_instances; i++)
    cluster.fork();