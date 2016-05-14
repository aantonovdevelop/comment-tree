var APIServer = require('../servers/api-server'),
    body_parser = require('body-parser');

var app = require('express')();

app.use(body_parser.json());

var factories = require('../factories'),
    services = require('../services')(4, factories),
    authentication = require('../middleware/authentication')(services.authorization_service);

var api_server = new APIServer(app, authentication);

var controller = require('../controllers/controller');

controller(api_server, services);

module.exports = app;
