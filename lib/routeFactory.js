var routes = require('./routes');
var Controller = require('./controller');
var messages = require('./messages');
var Repository = require('./repository');

function createFactory(options){
    options = options || {};
    options.messages = options.messages || messages;
    options.repository = options.repository || Repository;
    options.controller = options.controller || Controller;

    return function buildRoute(name, model, middlewareOptions, Repository){
        options.repository = Repository || options.repository;
        middlewareOptions = middlewareOptions || options.middlewareOptions;
        var controller = new options.controller(
            model,
            options.repository,
            options.messages
        );
        return new routes(name, controller, middlewareOptions);
    };
}

module.exports = createFactory;
