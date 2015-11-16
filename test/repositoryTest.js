var Repository = require('../src/repository');
var model = require('./model');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/smera_tests');

var modelRep = new Repository(model);

var firstItem = null;
var secondItem = null;

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
})
.then(function(item){
  secondItem = item;
  return modelRep.get();
})
.then(function(items){
  console.log(items.length);
  return modelRep.getById(firstItem._id);
})
.then(function(item){
  console.log(item);
  item.age = 22;
  return modelRep.update(item);
})
.then(function(item){
  console.log(item);
  return modelRep.delete(secondItem);
})
.then(function(item){
  console.log(item);
})
.catch(function(err) {
  console.log(err);
});
