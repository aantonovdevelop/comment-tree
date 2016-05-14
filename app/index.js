"use strict";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var app = require('./app')(mongoose);

app.listen(3000, function () {
    console.log('Server started on %d port', 3000);
});
