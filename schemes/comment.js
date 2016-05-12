"use strict";

var ObjectId = require('mongoose').Schema.Types.ObjectId;

var comment = {
    message: String,
    
    parent: {
        type: ObjectId,
        ref: 'Comment'
    }
    
};

module.exports = comment;