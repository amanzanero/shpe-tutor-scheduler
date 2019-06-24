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

const TUTOR = {
  email: 'amanzane@gmail.edu',
  name: 'Andrew Manzanero',
  password: '123456789',
  role: 'tutor',
  id: '',
  token: '',
};

describe('Course Module', () => {
  let courseId;

  before(done => {
    const usr = new User(TUTOR).save().then((res, err) => {
      if (err) return console.log(err);
      TUTOR.id = res.id;
      chai
        .request(app)
        .post(credRoute)
        .send({
          email: TUTOR.email,
          password: TUTOR.password,
        })
        .end((err, response) => {
          if (err) {
            console.log(err);
            done();
          }
          TUTOR.token = `Bearer ${response.body.data.token}`; // save the token!
          done();
        });
    });
  });

  after(() => {
    return new Promise(resolve => {
      User.deleteMany({}).then((res, err) => {
        if (err) {
          console.log(err);
        }
      });
      Course.findByIdAndDelete(courseId).then((res, err) => {});
      resolve();
    });
  });

  it('Create: It should return HTTP_CREATED_SUCCESSFULLY', done => {
    const coursePostBody = {
      name: 'Intro to bio',
      number: '101',
      school: 'BISC',
    };
    const route = '/api/course/add';
    chai
      .request(app)
      .post(route)
      .send(coursePostBody)
      .set('Authorization', TUTOR.token)
      .end((err, res) => {
        if (err) console.log(err);
        courseId = res.id;
        res.should.have.status(httpStatus.CREATED);
        done();
      });
  });
});
