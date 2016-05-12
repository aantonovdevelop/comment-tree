"use strict";

var ObjectId = require('mongoose').Schema.Types.ObjectId;

var user = {
    first_name: String,
    last_name: String,
    email: String,
    
    comments: [{type: ObjectId, ref: 'Comment'}]
};

module.exports = user;