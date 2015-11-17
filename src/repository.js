var Promise = require('q');

function Repository(model) {
  this.Model = model;
}

Repository.prototype = {
  get: function(criteria) {
    var deferred = Promise.defer();
    this.Model.find(criteria, function(err, items){
      if(err){
        deferred.reject(err);
      }else{
        deferred.resolve(items);
      }
    });
    return deferred.promise;
  },

  getById: function(id) {
    var deferred = Promise.defer();
    this.Model.findById(id, function(err, item){
      if(err){
        deferred.reject(err);
      }else{
        deferred.resolve(item);
      }
    });
    return deferred.promise;
  },

  create: function(item){
    var deferred = Promise.defer();
    var newItem = new this.Model(item);
    newItem.save(function(err){
      if(err){
        deferred.reject(err);
      }else{
        deferred.resolve(newItem);
      }
    });
    return deferred.promise;

  },

  update: function(item){
    var deferred = Promise.defer();
    this.Model.findByIdAndUpdate(item._id, item, function(err, updatedItem){
      if(err){
        deferred.reject(err);
      }else{
        deferred.resolve(item);
      }
    });
    return deferred.promise;
  },

  delete: function(id){
    var deferred = Promise.defer();
    this.Model.findByIdAndRemove(id, function(err, deletedItem){
      if(err){
        deferred.reject(err);
      }else{
        deferred.resolve(deletedItem);
      }
    });
    return deferred.promise;
  }

};

module.exports = Repository;
