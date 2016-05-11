var assert = require('assert');
var check_params = undefined;

describe('Utils', function () {
    describe('#check_params', function () {
        
        it('Should export check_params function', function () {
            check_params = require('../utils/check-params');
            
            assert.ok(check_params.name, 'check_params');
        });
        
        it('Should check request body fields and call next', function (done) {
            var req = {
                body: {
                    id: 1,
                    name: 'hello',
                    values: [1, 2, 3]
                }
            };
            
            var res = {
                sendStatus: function () {
                    done(new Error('It didn\'t call sendStatus function'));
                }
            };
            
            check_params({
                body: {
                    id: 'Number',
                    name: 'String',
                    values: 'Array'
                }
            }, req, res, done);
        });
        
        it('Should check request body fields and send error code 400', function (done) {
            var req = {
                body: {
                    id: 1,
                    name: 'hello'
                }
            };
            
            var res = {
                sendStatus: function (status) {
                    assert.equal(status, 400);
                    
                    done();
                }
            };
            
            check_params({
                body: {
                    id: 'Number',
                    name: 'String',
                    values: 'Array'
                }
            }, req, res, () => done(new Error('It didn\'t call next function')));
        });
        
        it('Should check request params and body fields and call next function', function (done) {

            var req = {
                params: {
                    id: 1
                },
                
                body: {
                    name: 'hello',
                    values: [1, 2, 3]
                }
            };

            var res = {
                sendStatus: function () {
                    done(new Error('It didn\'t call sendStatus function'));
                }
            };

            check_params({
                params: {
                    id: 'Number'
                },
                
                body: {
                    name: 'String',
                    values: 'Array'
                }
            }, req, res, done);
        });
        
        it('Should check request params and body fields and send error code 400', function (done) {

            var req = {
                params: {
                },

                body: {
                    name: 'hello',
                    values: [1, 2, 3]
                }
            };

            var res = {
                sendStatus: function () {
                    done();
                }
            };

            check_params({
                params: {
                    id: 'Number'
                },

                body: {
                    name: 'String',
                    values: 'Array'
                }
            }, req, res, () => done(new Error('It didn\'t call next function')));
        });
    });
});