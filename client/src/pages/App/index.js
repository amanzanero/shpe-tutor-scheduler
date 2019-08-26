import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import initStore from '../../config/store';

import HomePage from '../HomePage';
import LandingPage from '../LandingPage';
import theme from '../../theme';

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    flexFlow: 'column',
  },
};

const App = classes => (
  <div className={classes.root}>
    <ThemeProvider theme={theme}>
      <Router>
        <Route path="/" component={LandingPage} />
        <Route path="/home" component={HomePage} />
      </Router>
    </ThemeProvider>
  </div>
);

const AppWrapper = props => {
  const { classes } = props;
  const { store, persistor } = initStore();
  return (
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          {App(classes)}
        </PersistGate>
      ) : (
        App(classes)
      )}
    </Provider>
  );
};

AppWrapper.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(AppWrapper);
