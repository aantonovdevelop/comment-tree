"use strict";

var assert = require('assert');

var authorization_service_mock = {
    get_user: function (token) {
        if (token === 'correct') {
            return Promise.resolve({first_name: 'user'});
        } else {
            return Promise.resolve(null);
        }
    }
};

var authentication = require('../middleware/authentication')(authorization_service_mock);

describe('AuthenticationMiddleware', function () {
    it('Should add user info to request', function (done) {
        var req = {
            get() {
                return 'correct';
            }
        };
        
        var res = {
            sendStatus: function () {
                done(new Error('Should be ended with out errors'));
            }
        };
        
        authentication(req, res, function () {
            assert.equal(req.user.first_name, 'user');
            
            done();
        });
    });

    it('Should return 403 status because token is wrong', function () {
        var req = {
            get() {
                return 'incorrect';
            }
        };
        
        var res = {
            sendStatus: function (status) {
                assert.equal(status, 403);
                
                done();
            }
        };
        
        authentication(req, res, function () {
            done(new Error('Should send status 403'));
        });
    });
    
    it('Should return 403 because token is undefined', function (done) {
        var req = {
            get() {
                return undefined;
            }
        };

        var res = {
            sendStatus: function (status) {
                assert.equal(status, 403);

                done();
            }
        };

        authentication(req, res, function () {
            done(new Error('Should send status 403'));
        });
    });
});