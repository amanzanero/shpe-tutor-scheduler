import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import initStore from '../../config/store';

import HomePage from '../../containers/HomePage';
import LandingPage from '../LandingPage';
import theme from '../../theme';
import ManageAppointments from '../ManageAppointments';
import Nav from '../../containers/Nav';
import ManageCourses from '../../containers/ManageCourses';
import Settings from '../../containers/Settings';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexFlow: 'column',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <ManageCourses />
        <Settings />
        <Router>
          <Route exact path="/" component={LandingPage} />
          <Route path="/" component={Nav} />
          <Route path="/home" component={HomePage} />
          <Route path="/appointments" component={ManageAppointments} />
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default function AppWrapper() {
  const { store, persistor } = initStore();
  return (
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      ) : (
        <App />
      )}
    </Provider>
  );
}

AppWrapper.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
