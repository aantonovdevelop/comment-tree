"use strict";

var assert = require('assert'),
    md5 = require('md5');

function Account(schema) {
    assert.ok(schema.user);
    assert.ok(schema.username);
    assert.ok(schema.password);
    
    this.save = function () {
        return Promise.resolve(Object.assign({_id: 1}, schema));
    }
}

Account.authorize = function (username, password) {
    if (username === 'username' && password === md5('password')) {
        return Promise.resolve({
            _id: 1,
            username: username,
            password: password,
            user: 1
        });
    } else {
        return Promise.resolve(null);
    }
};

module.exports = Account;