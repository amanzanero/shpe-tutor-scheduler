const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const { Schema } = mongoose;

const roles = ['student', 'tutor', 'both', 'admin'];

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 128,
    },
    name: {
      type: String,
      maxlength: 50,
    },
    role: {
      type: String,
      default: 'student',
      enum: roles,
    },
    currentCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    previousCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this.password = bcrypt.hashSync(this.password);

    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  transform() {
    const transformed = {};
    const fields = [
      'id',
      'name',
      'email',
      'createdAt',
      'role',
      'currentCourses',
      'previousCourses',
      'appointments',
    ];

    fields.forEach(field => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password);
  },

  addAppointment(apptId) {
    try {
      this.appointments.push(apptId);
      this.save();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Error adding appointment to "${this.email}": ${e}`);
    }
  },
});

userSchema.statics = {
  roles,

  checkDuplicateEmailError(err) {
    if (err.code === 11000) {
      const error = new Error('Email already taken');
      error.errors = [
        {
          field: 'email',
          location: 'body',
          messages: ['Email already taken'],
        },
      ];
      error.status = httpStatus.CONFLICT;
      return error;
    }

    return err;
  },

  async findAndGenerateToken(payload) {
    const { email, password } = payload;
    if (!email) throw new APIError('Email must be provided for login');

    const user = await this.findOne({ email }).exec();
    if (!user)
      throw new APIError(
        `No user associated with ${email}`,
        httpStatus.NOT_FOUND,
      );

    const passwordOK = await user.passwordMatches(password);

    if (!passwordOK)
      throw new APIError(`Password mismatch`, httpStatus.UNAUTHORIZED);

    return user;
  },
};

module.exports = mongoose.model('User', userSchema);
