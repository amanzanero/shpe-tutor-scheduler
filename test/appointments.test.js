process.env.NODE_ENV = 'test';

const chai = require('chai');
const mongoose = require('../server/services/mongoose');
const chaiHttp = require('chai-http');
const { app } = require('../server/index');
const httpStatus = require('http-status');
const User = require('../server/models/user.model');
const Course = require('../server/models/course.model');
const should = chai.should();

chai.use(chaiHttp);

const credRoute = '/api/user/login';
const tutor = {
  email: 'amanzane@usc.edu',
  name: 'Andrew Manzanero',
  password: '123456789',
  role: 'tutor',
  id: '',
  token: '',
};
const student = {
  email: 'janedoe@usc.edu',
  name: 'Jane Doe',
  password: '123456789',
  role: 'student',
  id: '',
  token: '',
};
const coursePostBody = {
  name: 'Intro to bio',
  number: '101',
  school: 'BISC',
};

describe('Appointment module', () => {
  const prefix = '/api/appointment';
  let appt;
  let courseId;

  before(done => {
    // create tutor
    const course = new Course(coursePostBody).save().then((res, err) => {
      courseId = res.id;
    });
    const tut = new User(tutor).save().then((res, err) => {
      tutor.id = res.id;
    });

    const stud = new User(student).save().then((res, err) => {
      student.id = res.id;
      chai
        .request(app)
        .post(credRoute)
        .send({
          email: student.email,
          password: student.password,
        })
        .end((err, response) => {
          student.token = `Bearer ${response.body.data.token}`; // save the token!
          done();
        });
    });
  });

  after(done => {
    User.deleteMany({}).then((res, err) => {
      if (err) return console.log(err);
      return done();
    });
  });

  it('Create: It should return HTTP_CREATED_SUCCESSFULLY', done => {
    const apptPostBody = {
      tutor: tutor.id,
      student: student.id,
      guests: '5',
      phone: '1234567890',
      course: courseId,
    };
    chai
      .request(app)
      .post(prefix)
      .send(apptPostBody)
      .set('Authorization', student.token)
      .end((err, res) => {
        res.should.have.status(httpStatus.CREATED);
        appt = res.body.data;
        done();
      });
  });

  it('Delete: It should return HTTP_OK', done => {
    const apptDelBody = {
      id: `${appt.id}`,
    };
    chai
      .request(app)
      .delete(prefix)
      .send(apptDelBody)
      .set('Authorization', student.token)
      .end((err, res) => {
        res.should.have.status(httpStatus.OK);
        done();
      });
  });
});
