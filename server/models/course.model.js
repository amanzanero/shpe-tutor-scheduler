const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});

module.exports = mongoose.model('Course', courseSchema);
