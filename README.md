# smera
Simple MongoDB and Express REST API

smera creates a simple REST API with mongoose as default repository, but it accepts add another middlewares and change the controller, the repository or the return messages.

## Installation

Run the command:

```
npm install smera
```

## Example:

```
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Model = require('./model');

var smera = require('smera')();

mongoose.connect('mongodb://localhost:27017/myDb');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(smera('models', Model));

var server = app.listen(3000, function () {
});
```
Now you can call:
 * GET /models
 * GET /models/myResourceId
 * POST /models
 * PUT /models/myResourceId
 * DELETE /models/myResourceId

## Options
You can change default smera behavior.
Example:
```
var options = {
    messages: myMessages,
    repository: myRepository,
    controller: myController
};

var smera = require('smera')(options);
```

## Middlewares
You can use another middlewares before call controller.
Example:
```
var smera = require('smera')();
var anotherMiddlewares = {
  all: authentication,
  get: permission,
  getById: [permission, blablabla]
};

app.use(smera('models', Model, anotherMiddlewares));
```
