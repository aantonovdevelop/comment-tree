"use strict";

var ObjectId = require('mongoose').Schema.Types.ObjectId;
var Schema = require('mongoose').Schema;

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

var token_schema = new Schema(token);

token_schema.statics.get_attached_user = function (token) {
    return this.model('Token').findOne({token: token}).populate('user')
        .then(token => (token) ? token.user : null);
};

module.exports = token_schema;
