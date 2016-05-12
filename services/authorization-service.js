"use strict";

var md5 = require('md5');
var rand_token = require('rand-token');

class AuthorizationService {
    constructor (accountFactory, tokenFactory) {
        this.account_factory = accountFactory;
        this.token_factory = tokenFactory;
    }

    get_token(username, password) {
        return this.account_factory.get_model().findOne({
            username: username,
            password: md5(password)
        }).then(account => {
            if (account) {
                var token = {
                    account: account._id,
                    user: account.user,
                    token: rand_token.generate(32)
                };

                return this.token_factory.create_instance(token).save().then(() => {
                    return Promise.resolve(token.token);
                }).catch(err => {
                    return Promise.reject(err);
                });
            } else {
                return Promise.reject(new Error('Wrong username or password'));
            }
        }).catch(err => {
            return Promise.reject(err);
        });
    }
    

    get_user(token) {
        return this.token_factory.get_model().findOne({
            token: token
        }).populate('user').then(token => {
            if (token) return Promise.resolve(token.user);
            else return Promise.reject(new Error('Token has expired'));
        }).catch(err => {
            return Promise.reject(err);
        });
    }
}

module.exports = AuthorizationService;