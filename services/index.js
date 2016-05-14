var AuthorizationService = require('./authorization-service'),
    CommentService = require('./comment-service'),
    UserService = require('./user-service');

module.exports = function (nesting, factories) {
    return {
        authorization_service: new AuthorizationService(factories.account_factory, factories.token_factory),
        comment_service: new CommentService(nesting, factories.comment_factory),
        user_service: new UserService(factories.user_factory, factories.account_factory)
    }
};