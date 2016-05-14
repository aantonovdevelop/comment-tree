"use strict";

var request = require('supertest'),
    assert = require('assert');

var app = undefined;
var wrapper = undefined;

describe('Integration', function () {
    var username = 'dude',
        password = 'very_strong',
        token = undefined;
    
    describe('#Application', function () {
        it('Should return express application instance', function () {
            app = require('../app/app');
            
            assert.ok(app);
            
            wrapper = require('./wrappers/api-wrapper')(app);
        });
    });
    
    describe('#UserRegistration', function () {
        it('Should throw error because params is wrong', function (done) {
            wrapper.register_new_user({
                first_name: 'Buddy',
                last_name: 'Goodman',
                email: 'buddy@addr.com'
            }).expect(400).end((err) => done(err));
        });
        
        it('Should create new user', function (done) {
            wrapper.register_new_user({
                first_name: 'Buddy',
                last_name: 'Goodman',
                email: 'buddy@addr.com',
                username: username,
                password: password
            }).expect(200).end((err) => done(err));
        });
    });
    
    describe('#UserAuthorization', function () {
        it('Should throw error because credentials is wrong', function (done) {
            wrapper.get_token({
                username: 'buddy',
                password: 'wrongpassword'
            }).expect(403).end((err) => done(err));
        });

        it('Should return token', function (done) {
            wrapper.get_token({
                username: username,
                password: password
            }).expect(200).end((err, res) => {
                if (err) return done(err);
            
                token = res.body.token || null;
            
                assert.ok(token);
                
                done();
            });
        });
    });

    describe('#Commentaries', function () {
        
        it('Should throw error because token is invalid', function (done) {
            wrapper.get_comments('invalid_token').expect(403).end((err) => {
                done(err);
            });
        });
        
        
        it('Should create new commentary', function (done) {
            wrapper.get_comments(token).expect(200).end((err, res) => {
                if (err) done(err);
                
                var prev_comments_count = res.body.length;

                wrapper.create_comment({
                    message: 'Hello world!'
                }, token).expect(200).end((err, res) => {
                    if (err) return done(err);

                    assert.ok(res.body.id);

                    wrapper.get_comments(token).expect(200).end((err, res) => {
                        if (err) return done(err);

                        assert.equal(prev_comments_count + 1, res.body.length);

                        done();
                    });
                });
            });
        });
        
        it('Should receive list of all commentaries', function (done) {
            wrapper.get_comments(token).expect(200).end((err, res) => {
                if (err) return done(err);

                assert.ok(res.body.length > 0);

                done();
            });
        });
        
        it('Should create nested commentaries and trow error', function (done) {
            wrapper.create_comment({
                message: 'Hello_1'
            }, token).expect(200).end((err, res) => {
                if (err) return done(err);
                
                wrapper.create_comment({
                    message: 'Hello_2',
                    parent: res.body.id
                }, token).expect(200).end((err, res) => {
                    if (err) return done(err);

                    wrapper.create_comment({
                        message: 'Hello_4',
                        parent: res.body.id
                    }, token).expect(200).end((err, res) => {
                        if (err) return done(err);

                        wrapper.create_comment({
                            message: 'Hello_5',
                            parent: res.body.id
                        }, token).expect(200).end((err, res) => {
                            if (err) return done(err);

                            wrapper.create_comment({
                                message: 'Hello_6',
                                parent: res.body.id
                            }, token).expect(200).end((err) => {
                                if (err) {
                                    return done();
                                }
                                
                                return done(new Error('Should trow error'));
                            });

                        });

                    });
                    
                });
            });
        });
        
    });
    
    describe('#Users', function () {
        
        before('Generate new messages for users', function () {
            var token_1 = undefined,
                token_2 = undefined,
                token_3 = undefined;
            
            var user_1 = {
                first_name: 'user_1',
                last_name: 'user_1',
                email: 'some@mail.com',
                username: 'user_1',
                password: 'user_1'
            };
            
            var user_2 = {
                first_name: 'user_2',
                last_name: 'user_2',
                email: 'some@mail.com',
                username: 'user_2',
                password: 'user_2'
            };
            
            var user_3 = {
                first_name: 'user_3',
                last_name: 'user_3',
                email: 'some@mail.com',
                username: 'user_3',
                password: 'user_3'
            };
            
            
            wrapper.register_new_user(user_1).expect(200).end(err => {
                assert.equal(err, null);

                wrapper.register_new_user(user_2).expect(200).end(err => {
                    assert.equal(err, null);

                    wrapper.register_new_user(user_3).expect(200).end(err => {
                        assert.equal(err, null);

                        wrapper.get_token({
                            username: user_1.username,
                            password: user_1.password
                        }).expect(200).end((err, res) => {
                            assert.equal(err, null);
                            assert.ok(res.body.token);
                            
                            token_1 = res.body.token;
                            
                            wrapper.get_token({
                                username: user_2.username,
                                password: user_2.password
                            }).expect(200).end((err, res) => {
                                assert.equal(err, null);
                                assert.ok(res.body.token);

                                token_2 = res.body.token;

                                wrapper.get_token({
                                    username: user_3.username,
                                    password: user_3.password
                                }).expect(200).end((err, res) => {
                                    assert.equal(err, null);
                                    assert.ok(res.body.token);

                                    token_3 = res.body.token;

                                    var comment = {
                                        message: "Hello world!"
                                    };
                                    
                                    wrapper.create_comment(comment, token_1).expect(200).end(err => {
                                        assert.equal(err, null);

                                        wrapper.create_comment(comment, token_2).expect(200).end(err => {
                                            assert.equal(err, null);

                                            wrapper.create_comment(comment, token_2).expect(200).end(err => {
                                                assert.equal(err, null);

                                                wrapper.create_comment(comment, token_2).expect(200).end(err => {
                                                    assert.equal(err, null);

                                                    wrapper.create_comment(comment, token_3).expect(200).end(err => {
                                                        assert.equal(err, null);

                                                        wrapper.create_comment(comment, token_3).expect(200).end(err => {
                                                            assert.equal(err, null);

                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        
        it('Should return sorted by commentary count users list', function (done) {
            wrapper.get_users(token).expect(200).end((err, res) => {
                if (err) done(err);
                
                assert.ok(res.body[0].total_comments >= res.body[1].total_comments);
                assert.ok(res.body[1].total_comments >= res.body[2].total_comments);
                
                done();
            });
        });
        
    });
});

