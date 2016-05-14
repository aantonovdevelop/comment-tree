"use strict";

var assert = require('assert');

function Token(schema) {
    assert.ok(schema.token);
    assert.ok(schema.account);
    assert.ok(schema.user);
    
    this.save = function () {
        return Promise.resolve(schema);
    }
}

Token.get_attached_user = function (token) {
    if (token === 'correct') {
        return Promise.resolve({
            first_name: 'Dude'
        });
    } else {
        return Promise.resolve(null);
    }
};

module.exports = Token;