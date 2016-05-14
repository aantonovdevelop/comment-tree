var factories = require('./factories');

var UserService = require('./services/user-service');
var AuthorizationService = require('./services/authorization-service');
var CommentService = require('./services/comment-service');

var user_service = new UserService(factories.user_factory, factories.account_factory);
var authorization_service = new AuthorizationService(factories.account_factory, factories.token_factory);
var comment_service = new CommentService(factories.comment_factory);

/*
authorization_service.get_token('artem', '112233').then(token => {
    console.log(token)
}).catch(err => {
    console.log(err)
});
*/

/*
authorization_service.get_user('TzEk8VIipWzpfvoxNGBZq1EZZsYmzzTc').then((user) => {
    comment_service.create_comment(user, 'First Nice Comment').then(() => {
        comment_service.get_comments().then(console.log).catch(console.log);
    }).catch(console.log);
}).catch(console.log);
*/

//user_service.get_users().then((user) => console.log(user[0].comments)).catch(console.log);
authorization_service.get_token('artem', '112233').then(token => {
    authorization_service.get_user(token).then((user) => {
        comment_service.create_comment(user, 'Six Nice Comment', '5734ea8f33aed5a357dfdd65').then(console.log).catch(console.error);
    }).catch(console.error);
});


comment_service.get_comments().then(console.log);

/*
comment_service.get_level('5734d79fa589d0685f5268c2', function (level) {
    console.log(level);
});
*/
