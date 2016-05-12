var mongoose = require('mongoose');

var user_schema = require('../schemes/user');
var account_schema = require('../schemes/account');
var token_schema = require('../schemes/token');
var comment_schema = require('../schemes/comment');

var ModelFactory = require('./model-factory');

mongoose.connect('mongodb://localhost/test');

module.exports = {
    user_factory: new ModelFactory(mongoose, 'User', user_schema),
    account_factory: new ModelFactory(mongoose, 'Account', account_schema),
    token_factory: new ModelFactory(mongoose, 'Token', token_schema),
    comment_factory: new ModelFactory(mongoose, 'Comment', comment_schema)
};