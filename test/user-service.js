var assert = require('assert');

var UserService = require('../services/user-service'),
    user_factory = require('./mocks/user-factory'),
    account_factory = require('./mocks/account-factory');

var user_service = undefined;

describe('UserService', function () {
    describe('#constructor', function () {
        it('Should create UserService instance', function () {
            user_service = new UserService(user_factory, account_factory);
            
            assert.ok(user_service instanceof UserService);
            assert.ok(user_service.user_model);
            assert.ok(user_service.account_model);
        });
    });
    
    describe('#register_user', function () {
        it('Should create user and account', function (done) {
            user_service.register_user({
                first_name: 'Dude',
                last_name: 'Goodman',
                email: 'dude@addr.com'
            }, {
                username: 'dude',
                password: 'very_strong'
            }).then(() => done()).catch(done);
        });
    });
    
    describe('#get_users', function () {
        it('Should return all users', function (done) {
            user_service.get_users().then(users => {
                assert.ok(users instanceof Array);
                
                assert.equal(users.length, 2);
                assert.equal(users[0].first_name, 'Dude_1');
                assert.equal(users[1].first_name, 'Dude_2');
                
                done();
            }).catch(done);
        });
    });
});