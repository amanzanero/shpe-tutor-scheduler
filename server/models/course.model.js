const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  school: { type: String, required: true },
});

courseSchema.method({
  transform() {
    return { id: this.id };
  },
});

module.exports = mongoose.model('Course', courseSchema);
