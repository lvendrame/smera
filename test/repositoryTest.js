var Repository = require('../lib/repository');
var model = require('./model');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/smera_tests');

var modelRep = new Repository(model);

var firstItem = null;
var secondItem = null;
var onError = function(err) {
  console.log(err);
};

modelRep.create({
	name : 'Teste Model',
	age : 21,
  createdAt: new Date()
})
.then(function(item){
  firstItem = item;
  return modelRep.create({
  	name : 'Teste Model 2',
  	age : 45,
    createdAt: new Date()
  });
}, onError)
.then(function(item){
  secondItem = item;
  return modelRep.get();
}, onError)
.then(function(items){
  console.log(items.length);
  return modelRep.getById(firstItem._id);
}, onError)
.then(function(item){
  console.log(item);
  item.age = 22;
  return modelRep.update(item);
}, onError)
.then(function(item){
  console.log(item);
  return modelRep.delete(secondItem);
})
.then(function(item){
  console.log(item);
}, onError)
;
