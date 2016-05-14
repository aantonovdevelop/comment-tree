"use strict";

var assert = require('assert');

function User(schema) {
    assert.ok(schema.first_name);
    assert.ok(schema.last_name);
    assert.ok(schema.email);
    
    this.save = function () {
        return Promise.resolve(Object.assign({_id: 1}, schema));
    }
}

User.get_all = function () {
    return Promise.resolve([
        {
            first_name: 'Dude_1'
        }, {
            first_name: 'Dude_2'
        }
    ]);
};

module.exports = User;