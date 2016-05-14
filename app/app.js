var APIServer = require('../servers/api-server'),
    body_parser = require('body-parser');

module.exports = function (config, mongoose) {
    var app = require('express')(mongoose);

    app.use(body_parser.json());

    var factories = require('../factories')(mongoose),
        services = require('../services')(config.nesting_level, factories),
        authentication = require('../middleware/authentication')(services.authorization_service);

    var api_server = new APIServer(app, authentication);

    var controller = require('../controllers/controller');

    controller(api_server, services);
    
    return app;
};
