"use strict";

var assert = require('assert');

function Comment(schema) {
    assert.ok(schema.message);
    assert.ok(schema.parent);
    
    this.save = function () {
        return Promise.resolve(Object.assign({_id: 1}, schema));
    }
}

Comment.get_parent = function (id) {
    return Promise.resolve((id < 5) ? ++id : undefined);
};

Comment.get_by_id = function (id) {
    return Promise.resolve({_id: id, message: "test_message", parent: ++id});
};

Comment.get_all = function () {
    return Promise.resolve([{
        _id: 1,
        message: "test_message",
        parent: undefined
    }, {
        _id: 2,
        message: "test_message",
        parent: undefined
    }]);
};

module.exports = Comment;