"use strict";

var ObjectId = require('mongoose').Schema.Types.ObjectId;
var Schema = require('mongoose').Schema;

var user = {
    first_name: String,
    last_name: String,
    email: String,
    
    comments: [{type: ObjectId, ref: 'Comment'}]
};

var user_schema = new Schema(user);

user_schema.statics.get_all = function () {
    return this.model('User').aggregate([
        {
            $project: {
                _id: true,
                email: true,
                first_name: true,
                last_name: true,
                total_comments: {
                    $size: '$comments'
                }
            }
        }, {
            $sort: {
                total_comments: -1
            }
        }
    ], function (err, result) {
        return err ? Promise.reject(err) : Promise.resolve(result);
    });
};

module.exports = user_schema;