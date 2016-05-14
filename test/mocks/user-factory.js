"use strict";

var user_model_mock = require('./models/user');

module.exports = {
    get_model() {
        return user_model_mock;
    }
};