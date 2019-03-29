import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import NavBar from '../../components/NavBar';
import HomePage from '../HomePage';
import SignUp from '../SignUp';
import NotFound from '../NotFound';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <NavBar/>
          <Router>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="*" component={NotFound} />
              </Switch>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
