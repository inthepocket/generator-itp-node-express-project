const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SampleSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

SampleSchema.pre('save', (next) => {
  if (!this.isModified('updatedAt')) {
    this.updatedAt = new Date();
  }

  next();
});

mongoose.model('Sample', SampleSchema);

module.exports = SampleSchema;
