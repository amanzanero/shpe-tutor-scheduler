/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const passport = require('passport');
const errorHandler = require('../middlewares/error-handler');
const apiRouter = require('../routes/api');
const config = require('../config');
const passportJwt = require('../services/passport');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

if (config.env !== 'test') app.use(morgan('combined'));

// passport
app.use(passport.initialize());
passport.use('jwt', passportJwt.jwt);

if (config.env === 'production') {
  app.get('/', (req, res) =>
    res.sendFile(path.resolve(`${__dirname}/../../client/build/index.html`)),
  );
  app.use(express.static(path.resolve(`${__dirname}/../../client/build`)));
}

app.use('/api', apiRouter);
app.use(errorHandler.handleNotFound);
app.use(errorHandler.handleError);

exports.start = () => {
  app.listen(config.port, err => {
    if (err) {
      console.log(`Error : ${err}`);
      process.exit(-1);
    }

    console.log(`${config.app} is running on ${config.port}`);
  });
};

exports.app = app;
