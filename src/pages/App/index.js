import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

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
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/" component={Nav} />
          </Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/appointments" component={ManageAppointments} />
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default function AppWrapper() {
  const store = initStore();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
