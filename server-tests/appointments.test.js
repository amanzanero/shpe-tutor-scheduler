process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../server/index')
const httpStatus = require('http-status')

const should = chai.should()

chai.use(chaiHttp);

const credRoute = '/api/user/login';
const tutor = {
  "email": "amanzane@usc.edu",
  "name": "Andrew Manzanero",
  "password":"123456789",
  "role": "tutor",
  "id" : "",
  "token": "",
}
const student = {
  "email": "janedoe@usc.edu",
  "name": "Jane Doe",
  "password":"123456789",
  "role": "student",
  "id" : "",
  "token": "",
}

describe('Appointment module', () => {
    const prefix = '/api/appointment';
  
    before((done) => {
      // create tutor
      chai
        .request(app)
        .post('/api/user/register')
        .send(tutor)
        .end((err, res) => {
          tutor.id = res.body.data.id;
        });
    
      chai
        .request(app)
        .post('/api/user/register')
        .send(student)
        .end((err, res) => {
          student.id = res.body.data.id;
        });
    
      chai
        .request(app)
        .post(credRoute)
        .send({
          email: student.email,
          password: student.password,
        })
        .end((err, response) => {
          student.token = `Bearer ${response.body.data.token}`; // save the token!
        });
    
      chai
        .request(app)
        .post(credRoute)
        .send({
          email: tutor.email,
          password: tutor.password,
        })
        .end((err, response) => {
          tutor.token = `Bearer ${response.body.data.token}`; // save the token!
          done();
        });
    });
    
    after((done) => {
      const logOut = '/api/user/profile';
      chai
        .request(app)
        .delete(logOut)
        .set('Authorization', student.token)
        .then(() => done(), done);
    
      chai
        .request(app)
        .delete(logOut)
        .set('Authorization', tutor.token)
        .then(() => done(), done);
    });
    
    it('It should return HTTP_CREATED_SUCCESSFULLY', done => {
      const apptPostBody = {
        "tutor": `${tutor.id}`,
        "student": `${student.id}`,
        "guests": "5",
        "phone": "1234567890"
      };
      chai
        .request(app)
        .post(prefix)
        .send(apptPostBody)
        .set('Authorization', student.token)
        .end((err, res) => {
          res.should.have.status(httpStatus.CREATED)
          done()
        });
    })
  })