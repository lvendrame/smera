var routeFactory = require('../lib/routeFactory')();
var express = require('express');
var Model = require('./model');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/smera_tests');

var app = express();

var modelRoute = routeFactory('models', Model);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(modelRoute);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
