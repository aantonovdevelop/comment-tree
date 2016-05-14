"use strict";

var config = require('../package.json').config,
    mongoose = require('mongoose');

mongoose.connect(config.mongodb);

var app = require('./app')(config, mongoose);

app.listen(3000, function () {
    console.log('Server started on %d port', 3000);
});
