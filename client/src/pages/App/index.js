import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import HomePage from '../HomePage';
import LandingPage from '../LandingPage';
import theme from '../../theme';

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    flexFlow: 'column'
  }
};

const App = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Router>
          <Route path="/" component={LandingPage} />
          <Route path="/home" component={HomePage} />
        </Router>
      </ThemeProvider>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(App);
