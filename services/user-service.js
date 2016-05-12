"use strict";

var md5 = require('md5');

class UserService {
    constructor (userFactory, accountFactory) {
        this.user_factory = userFactory;
        this.account_factory = accountFactory;
    }

    create_user(user, account) {
        return this.user_factory.create_instance(user).save().then(user => {
            account.user = user._id;
            account.password = md5(account.password);
            
            return this.account_factory.create_instance(account).save()
        }).catch(err => {
            return Promise.reject(err);
        });
    }
    
    get_users() {
        return this.user_factory.get_model().find().populate('comments');
    }
}

module.exports = UserService;