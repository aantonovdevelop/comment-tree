"use strict";

var comment_model_mock = require('./models/comment');

module.exports = {
    get_model () {
        return comment_model_mock;
    }
};