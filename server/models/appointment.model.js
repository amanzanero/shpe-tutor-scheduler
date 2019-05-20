const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentSchema = new Schema(
  {
    tutor: { type: Schema.Types.ObjectId, ref: 'User' },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    confirmed: {
      type: Boolean,
      default: false,
    },
    phone: { type: String, required: true },
    // courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  },
  {
    timestamps: true,
  },
);

appointmentSchema.method({
  async transform() {
    const transformed = {};

    const fields = [
      'id',
      'tutor',
      'students',
      'createdAt',
      'confirmed',
      'phone',
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
