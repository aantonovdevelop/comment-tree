"use strict";

var account_model_mock = require('./models/account');

module.exports = {
    get_model () {
        return account_model_mock;
    }
};