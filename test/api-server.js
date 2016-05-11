var assert = require('assert');
var request = require('supertest');
var express = require('express');
var body_parser = require('body-parser');

var app = express();
var APIServer = require('../servers/api-server');
var api_server = undefined;

describe('APIServer', function () {
    describe('#constructor', function () {
        it('Should create APIServer instance', function () {
            app.use(body_parser.json());

            api_server = new APIServer(app);

            assert.ok(api_server instanceof APIServer);
        });
    });

    describe('#GET /user', function () {
        it('Should emit APIServer#get_all_users event', function (done) {
            api_server.on('get_all_users', function (req, res) {
                assert.ok(req);
                assert.ok(res);

                done();
            });

            request(app)
                .get('/user')
                .expect(200).end(function (err) {
                    if (err) done(err);
                });
        });
    });
    
    describe('#POST /user', function () {
        it('Should emit APIServer#user_registration', function (done) {
            api_server.on('user_registration', function (req, res) {
                assert.ok(req);
                assert.ok(res);
                
                done();
            });
            
            request(app)
                .post('/user')
                .set('Content-Type', 'Application/JSON')
                .send(JSON.stringify({
                    first_name: 'Buddy',
                    last_name: 'Goodman',
                    email: 'buddy@addr.com'
                }))
                .expect(200).end(function (err) {
                    if (err) done(err);
                });
        });
    });
    
    describe('#POST /token', function () {
        it('Should emit APIServer#get_access_token', function (done) {
            api_server.on('get_access_token', function (req, res) {
                assert.ok(req);
                assert.ok(res);
                
                done();
            });
            
            request(app)
                .post('/token')
                .set('Content-Type', 'Application/JSON')
                .send(JSON.stringify({
                    username: 'buddy',
                    password: 'verySTRONG!!!Pwd'
                }))
                .expect(200).end(function (err) {
                    if (err) done(err);
                });
        });
    });
    
    describe('#POST /comment', function () {
        it('Should emit APIServer#create_comment', function (done) {
            api_server.on('create_comment', function (req, res) {
                assert.ok(req);
                assert.ok(res);

                done();
            });

            request(app)
                .post('/comment')
                .set('Content-Type', 'Application/JSON')
                .send(JSON.stringify({
                    message: 'Some painfull commentary'
                }))
                .expect(200).end(function (err) {
                    if (err) done(err);
                });
        });
    });
    
    describe('#GET /comment', function () {
        it('Should emit APIServer#get_all_commits', function (done) {
            api_server.on('get_all_comments', function (req, res) {
                assert.ok(req);
                assert.ok(res);
                
                done();
            });
            
            request(app)
                .get('/comment')
                .expect(200).end(function (err) {
                    if (err) done(err);
                });
        });
    });
});