"use strict";

var ObjectId = require('mongoose').Schema.Types.ObjectId;
var Schema = require('mongoose').Schema;

var comment = {
    message: String,
    
    parent: {
        type: ObjectId,
        ref: 'Comment'
    }
};

var comment_schema = new Schema(comment);

comment_schema.statics.get_parent = function (id) {
    return this.model('Comment').findOne({_id: id})
        .then((parent) => (parent) ? parent.parent : undefined);
};

comment_schema.statics.get_all = function () {
    return this.model('Comment').find();
};

module.exports = comment_schema;