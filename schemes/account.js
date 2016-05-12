"use strict";

var ObjectId = require('mongoose').Schema.Types.ObjectId;

var account = {
    user: {
        type: ObjectId, ref: 'User'
    },
    type_id: ObjectId,
    
    username: String,
    password: String
};

module.exports = account;