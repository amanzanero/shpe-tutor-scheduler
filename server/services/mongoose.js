/* eslint-disable no-console */
/* eslint-disable no-constant-condition */
const mongoose = require('mongoose');
const config = require('../config');
mongoose.Promise = require('bluebird');

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected');
});

mongoose.connection.on('error', err => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(-1);
});

if (config.env === 'dev') {
  mongoose.set('debug', true);
}

exports.connect = () => {
  let mongoURI;
  switch (config.env) {
    case 'production':
      mongoURI = config.mongo.uri;
      break;
    case 'development':
      mongoURI = config.mongo.uri;
      break;
    case 'test':
      mongoURI = config.mongo.testURI;
      break;
    default:
      mongoURI = config.mongo.testURI;
      break;
  }
  console.log('Mongo URL:', mongoURI);
  mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    keepAlive: 1,
  });

  return mongoose.connection;
};
