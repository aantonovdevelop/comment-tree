"use strict";

var ObjectId = require('mongoose').Schema.Types.ObjectId;

var token = {
    token: String,
    
    account: {type: ObjectId, ref: 'Account'},
    user: {type: ObjectId, ref: 'User'},

    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
};

module.exports = token;
