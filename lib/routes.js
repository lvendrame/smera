var express = require('express');
var routesPatterns = {
  get: "/r",
  getById: "/r/:id",
  create: "/r",
  update: "/r/:id",
  delete: "/r/:id"
};

function createRoutes(name, controller, middlewareOptions) {
  middlewareOptions = middlewareOptions||{};

  var routes = {
    get: {uri: routesPatterns.get.replace('r', name), method: 'get'},
    getById: {uri: routesPatterns.getById.replace('r', name), method: 'get'},
    create: {uri: routesPatterns.create.replace('r', name), method: 'post'},
    update: {uri: routesPatterns.update.replace('r', name), method: 'put'},
    delete: {uri: routesPatterns.delete.replace('r', name), method: 'delete'}
  };

  return routeBuilder(routes, controller, middlewareOptions);
}

function pushArrayItems(arr, items){
  var i=0, len= items.length|0;
  for(;i<len;i++){
    arr.push(items[i]);
  }
}

function routeBuilder(routes, controller, middlewareOptions){
  var router = express.Router();
  var middlewares = middlewareOptions.all || [];
  var args, mw, route;

  if(!Array.isArray(middlewares)){
    middlewares = [middlewares];
  }

  for (var prop in routes) {
    if (routes.hasOwnProperty(prop)) {
      args = middlewares.slice();

      mw = middlewareOptions[prop];
      if(mw){
        if(Array.isArray(md)){
          pushArrayItems(args, mw);
        }else{
          args.push(mw);
        }
      }

      route = routes[prop];
      (function(controller, prop) {
          args.push(function(req, resp){
            controller[prop].call(controller, req, resp);
          });
      }(controller, prop));
      
      args.unshift(route.uri);

      router[route.method].apply(router, args);
    }
  }

  return router;
}

module.exports = createRoutes;
