var mongoose = require('mongoose');

module.exports = mongoose.model('Model', {
	name : {type: String, required: true },
	age : {type: Number, required: true },
  createdAt: {type: Date, required: true }
});
