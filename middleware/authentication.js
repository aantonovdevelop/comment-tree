"use strict";

module.exports = function (authorizationService) {
    return function (req, res, next) {
        var token = req.get('Authorization') || req.get('authorization');

        if (token) {
            authorizationService.get_user(token).then(user => {
                req.user = user;
                
                next();
            }).catch(() => {
                res.sendStatus(403);
            });
        } else {
            res.sendStatus(403);
        }
    }
};