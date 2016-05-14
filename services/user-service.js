"use strict";

var md5 = require('md5');

class UserService {
    constructor (userFactory, accountFactory) {
        this.user_model = userFactory.get_model();
        this.account_model = accountFactory.get_model();
    }

    register_user(userSchema, accountSchema) {
        accountSchema.password = md5(accountSchema.password);
        
        return create_user.call(this, userSchema).then(user => {
            accountSchema.user = user._id;
            
            return create_account.call(this, accountSchema);
        });
        
        function create_user(schema) {
            var user = new this.user_model(schema);
            
            return user.save();
        }
        
        function create_account(schema) {
            var account = new this.account_model(schema);

            return account.save();
        }
    }
    
    
    get_users() {
        return this.user_model.get_all();
    }
}

module.exports = UserService;