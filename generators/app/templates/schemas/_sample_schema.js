var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var SampleSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt:  {
    type: Date,
    default: Date.now,
    required: true
  }
});

SampleSchema.pre('save', function (next) {
  if (!this.isModified('updatedAt')) {
    this.updatedAt = new Date();
  }
  next();
});

mongoose.model('Sample', SampleSchema);

module.exports = SampleSchema;
