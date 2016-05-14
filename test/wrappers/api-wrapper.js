"use strict";

var request = require('supertest');

module.exports = function (app) {
    return {
        register_new_user: function (body) {
            return request(app)
                .post('/user')
                .set('Content-Type', 'Application/JSON')
                .send(JSON.stringify(body));
        },
        
        get_token: function (body) {
            return request(app)
                .post('/token')
                .set('Content-Type', 'Application/JSON')
                .send(JSON.stringify(body));
        },
        
        get_comments: function (token) {
            return request(app)
                .get('/comment')
                .set('Authorization', token);
        },
        
        create_comment: function (body, token) {
            return request(app)
                .post('/comment')
                .set('Content-Type', 'Application/JSON')
                .set('Authorization', token)
                .send(JSON.stringify(body));
        },
        
        get_users: function (token) {
            return request(app)
                .get('/user')
                .set('Authorization', token);
        }
    }
};