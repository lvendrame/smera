function Controller(model, Repository, messages){
  this.repository = new Repository(model);
  this.messages = messages;
}

Controller.prototype = {
  get: function(request, response) {
    var messages = this.messages;
    this.repository.get(request.body)
    .then(function(items){
      messages.ok(items, response);
    })
    .catch(function (err) {
      messages.error(err, response);
    });
  },

  getById: function(request, response) {
    var messages = this.messages;
    this.repository.getById(request.params.id)
    .then(function(item){
      if(!item){
        messages.notFound(response);
        return;
      }
      messages.ok(item, response);
    })
    .catch(function (err) {
      messages.error(err, response);
    });
  },

  create: function(request, response) {
    var messages = this.messages;
    this.repository.create(request.body)
    .then(function(item){
      messages.ok(item, response);
    })
    .catch(function (err) {
      messages.error(err, response);
    });
  },

  update: function(request, response) {
    var messages = this.messages;
    this.repository.update(request.body)
    .then(function(item){
      if(!item){
        messages.notFound(response);
        return;
      }
      messages.ok(request.body, response);
    })
    .catch(function (err) {
      messages.error(err, response);
    });
  },

  delete: function(request, response) {
    var messages = this.messages;
    this.repository.delete(request.params.id)
    .then(function(item){
      if(!item){
        messages.notFound(response);
        return;
      }
      messages.ok(item, response);
    })
    .catch(function (err) {
      messages.error(err, response);
    });
  }

};

module.exports = Controller;
