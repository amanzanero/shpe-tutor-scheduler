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
  const mongoURI =
    config.env === 'prod' || 'dev' ? config.mongo.uri : config.mongo.testURI;

  mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    keepAlive: 1,
  });

  return mongoose.connection;
};
