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
const chalk = require('chalk');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

const isProduction = config.env === 'production';

if (isProduction) app.use(morgan('combined'));
else app.use(morgan('dev'));

// passport
app.use(passport.initialize());
passport.use('jwt', passportJwt.jwt);

if (isProduction) {
  app.use(express.static(path.resolve(`${__dirname}/../../build/`)));
}
// serve react app if we are in production mode
app.use('/api', apiRouter);
if (isProduction) {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../../build/index.html`));
  });
}
app.use(errorHandler.handleNotFound);
app.use(errorHandler.handleError);

exports.start = () => {
  app.listen(config.port, err => {
    if (err) {
      console.log(`Error : ${err}`);
      process.exit(-1);
    }
    if (!isProduction)
      console.log(
        chalk.blueBright
          .bold(` ____ _  _ ____ ____     __   ___  __  ____ ____ _  _ __ ___ ____ 
/ ___) )( (  _ (  __)   / _\\ / __)/ _\\(    (  __| \\/ |  ) __) ___)
\\___ ) __ () __/) _)   /    ( (__/    \\) D () _)/ \\/ \\)( (__\\___ \\
(____|_)(_(__) (____)  \\_/\\_/\\___)_/\\_(____(____)_)(_(__)___|____/

 ____ ____ ____  _  _ ____ ____ 
/ ___|  __|  _ \\/ )( (  __|  _ \\
\\___ \\) _) )   /\\ \\/ /) _) )   /
(____(____|__\\_) \\__/(____|__\\_)`),
      );
    const statement = `
*********************************************
${config.app} is running on PORT: ${config.port}
*********************************************`;
    const welcomeSplash = isProduction
      ? statement
      : chalk.blue.bold(statement.toUpperCase());
    console.log(welcomeSplash);
  });
};

exports.app = app;
