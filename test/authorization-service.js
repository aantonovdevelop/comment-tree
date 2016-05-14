"use strict";

var assert = require('assert');

var AuthorizationService = require('../services/authorization-service');

var account_factory = require('./mocks/account-factory'),
    token_factory = require('./mocks/token-factory');

var authorization_service = undefined;

describe('AuthorizationService', function () {
    describe('#constructor', function () {
        it('Should create AuthorizationService instance', function () {
            authorization_service = new AuthorizationService(account_factory, token_factory);
            
            assert.ok(authorization_service instanceof AuthorizationService);
            assert.ok(authorization_service.account_model);
            assert.ok(authorization_service.token_model);
        });
    });
    
    describe('#get_token', function () {
        it('Should create and return token', function (done) {
            authorization_service.get_token('username', 'password')
                .then(token => {
                    assert.equal(token.account, 1);
                    assert.equal(token.user, 1);
                    assert.equal(token.token.length, 32);
                    
                    done();
                }).catch(done);
        });
        
        it('Should trow error because password is invalid', function (done) {
            authorization_service.get_token('username', 'wrongpassword')
                .then(() => done(new Error('Should throw error')))
                .catch(error => {
                    assert.equal(error.message, 'Wrong username or password');
                    
                    done();
                });
        });
    });
    
    describe('#get_user', function () {
        it('Should return user model by token', function (done) {
            authorization_service.get_user('correct')
                .then(user => {
                    assert.equal(user.first_name, 'Dude');
                    
                    done();
                }).catch(done);
        });
        
        it('Should trow error because token expired', function (done) {
            authorization_service.get_user('expired')
                .then(() => done(new Error('Should trow error')))
                .catch(error => {
                    assert.equal(error.message, 'Token has expired');
                    
                    done();
                });
        });
    });
});
