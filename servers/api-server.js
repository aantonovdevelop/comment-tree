
'use strict';

var EventEmitter = require('events');

var check_params = require('../utils/check-params');

class APIServer extends EventEmitter {

    constructor(app, authentication) {
        super();
        
        /**
         * @api {post} /user New user registration
         * @apiGroup User
         *
         * @apiParam (JSON) {String} first_name
         * @apiParam (JSON) {String} last_name
         * @apiParam (JSON) {String} email
         * @apiParam (JSON) {String} username
         * @apiParam (JSON) {String} password
         */
        app.post('/user', check_params.bind(undefined, {
            body: {
                first_name: 'String',
                last_name: 'String',
                email: 'String',
                username: 'String',
                password: 'String'
            }
        }), this.on_user_registration.bind(this));

        /**
         * @api {get} /user Get all users
         * @apiGroup User
         */
        app.get('/user', authentication, this.on_get_all_users.bind(this));

        /**
         * @api {post} /token Get access token
         * @apiGroup Authorization
         * 
         * @apiParam (JSON) {String} username
         * @apiParam (JSON) {String} password 
         */
        app.post('/token', check_params.bind(undefined, {
            body: {
                username: 'String',
                password: 'String'
            }
        }), this.on_get_access_token.bind(this));

        /**
         * @api {post} /comment Create new commentary
         * @apiGroup Commentary
         * 
         * @apiParam (JSON) {String} message
         * @apiParam (JSON) {String} [parent] ID of parent commentary
         */
        app.post('/comment', authentication, check_params.bind(undefined, {
            body: {
                message: 'String'
            }
        }), this.on_create_comment.bind(this));

        /**
         * @api {get} /comment Get all commentaries
         * @apiGroup Commentary
         */
        app.get('/comment', authentication, this.on_get_all_comments.bind(this));
    }
    
    on_user_registration(req, res) {
        this.emit('user_registration', req, res);
    }
    
    on_get_all_users(req, res) {
        this.emit('get_all_users', req, res);
    }
    
    on_get_access_token(req, res) {
        this.emit('get_access_token', req, res);
    }
    
    on_create_comment(req, res) {
        this.emit('create_comment', req, res);
    }
    
    on_get_all_comments(req, res) {
        this.emit('get_all_comments', req, res);
    }
}

module.exports = APIServer;