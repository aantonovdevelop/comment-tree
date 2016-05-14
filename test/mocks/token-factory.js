"use strict";

var token_model_mock = require('./models/token');

module.exports = {
    get_model () {
        return token_model_mock;
    }
};