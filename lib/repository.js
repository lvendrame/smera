function Repository(model) {
  this.Model = model;
}

Repository.prototype = {
  get: function(criteria) {
    return this.Model.find(criteria).exec();
  },

  getById: function(id) {
    return this.Model.findById(id).exec();
  },

  create: function(item){
    var newItem = new this.Model(item);
    return newItem.save();
  },

  update: function(item){
    return this.Model.findByIdAndUpdate(item._id, item).exec();
  },

  delete: function(id){
    return this.Model.findByIdAndRemove(id).exec();
  }

};

module.exports = Repository;
