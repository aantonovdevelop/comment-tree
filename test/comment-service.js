"use strict";

var assert = require('assert');

var CommentService = require('../services/comment-service'),
    comment_factory = require('./mocks/comment-factory');

var comment_service = undefined,
    maximum_nesting_lvl = 6;

describe('CommentService', function () {
    describe('#constructor', function () {
        it('Should create CommentService instance', function () {
            comment_service = new CommentService(maximum_nesting_lvl, comment_factory);
            
            assert.ok(comment_service instanceof CommentService);
            assert.ok(comment_service.model);
        });
    });
    
    describe('#get_comments', function () {
        it('Should get all comments', function (done) {
            comment_service.get_comments().then(comments => {
                assert.ok(comments instanceof Array);
                assert.ok(comments.length === 2);
                
                assert.equal(comments[0].message, "test_message");
                assert.equal(comments[1].message, "test_message");
                
                done();
            });
        });
    });
    
    describe('#create_comment', function () {
        var user = {
            comments: [],
            save: function () {
                return Promise.resolve();
            }
        };

        it('Should create new user comment', function (done) {
            comment_service.nesting_level = maximum_nesting_lvl;
            
            comment_service.create_comment(user, "some message", 1)
                .then(() => {
                    assert.equal(user.comments.length, 1);
                    
                    done();
                }).catch(done);
        });
        
        it('Should throw error of nesting level', function (done) {
            comment_service.nesting_level = 1;
            
            comment_service.create_comment(user, "some message", 1)
                .then(() => done(new Error('Should trow error')))
                .catch(error => {
                    assert.equal(error.message, "Maximum level of nesting");
                    
                    done();
                });
        });
    });
    
    describe('#nesting_level', function () {
        
        var default_nesting_lvl = 4;
        
        it('Should set nesting level', function () {
            comment_service.nesting_level = 3;
            
            assert.equal(comment_service._maximum_nesting_lvl, 3);
        });
        
        it('Should set default nesting level because new more than 10', function () {
            comment_service.nesting_level = 11;
            
            assert.equal(comment_service._maximum_nesting_lvl, default_nesting_lvl);
        });
        
        it('Should set default nesting level because new less than 1', function () {
            comment_service.nesting_level = 0;
            
            assert.equal(comment_service._maximum_nesting_lvl, default_nesting_lvl);
        });
        
        it('Should return current level of nesting', function () {
            comment_service._maximum_nesting_lvl = default_nesting_lvl;
            
            assert.equal(comment_service.nesting_level, default_nesting_lvl);
        });
    });
});