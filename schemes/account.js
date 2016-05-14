"use strict";

var ObjectId = require('mongoose').Schema.Types.ObjectId;
var Schema = require('mongoose').Schema;

var account = {
    user: {
        type: ObjectId, ref: 'User'
    },
    
    username: String,
    password: String
};

var account_schema = new Schema(account);

account_schema.statics.authorize = function (username, password) {
    return this.model('Account').findOne({
        username: username,
        password:password
    }).then(account => account || null);
};

module.exports = account_schema;