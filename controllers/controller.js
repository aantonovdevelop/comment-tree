module.exports = function (server, services) {

    server.on('user_registration', function (req, res) {
        var user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        };

        var account = {
            username: req.body.username,
            password: req.body.password
        };

        services.user_service.register_user(user, account).then(() => res.sendStatus(200));
    });

    server.on('get_access_token', function (req, res) {
        services.authorization_service.get_token(req.body.username, req.body.password)
            .then((token) => res.send({token: token.token})).catch(() => res.sendStatus(403))
    });

    server.on('get_all_users', function (req, res) {
        services.user_service.get_users().then(users => res.send(users)).catch(() => res.sendStatus(500));
    });

    server.on('get_all_comments', function (req, res) {
        services.comment_service.get_comments().then(comments => res.send(comments)).catch(() => res.sendStatus(500));
    });

    server.on('create_comment', function (req, res) {
        services.comment_service.create_comment(req.user, req.body.message, req.body.parent)
        .then((comment) => res.send({id: comment._id})).catch(() => res.sendStatus(500));
    });
};