"use strict";

var md5 = require('md5');
var rand_token = require('rand-token');

class AuthorizationService {
    constructor (accountFactory, tokenFactory) {
        this.account_model = accountFactory.get_model();
        this.token_model = tokenFactory.get_model();
    }

    get_token(username, password) {
        return this.account_model.authorize(username, md5(password))
            .then(account => {
                if (account) return create_token.call(this, account);
                else return Promise.reject(new Error('Wrong username or password'));
            });
        
        function create_token(account) {
            var token = new this.token_model({
                account: account._id,
                user: account.user,
                token: rand_token.generate(32)
            });
            
            return token.save();
        }
    }
    
    get_user(token) {
        return this.token_model.get_attached_user(token).then((user) => {
            if (user) return Promise.resolve(user);
            else return Promise.reject(new Error('Token has expired'));
        });
    }
}

module.exports = AuthorizationService;