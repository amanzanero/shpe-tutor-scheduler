import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import NavBar from '../../components/NavBar';
import HomePage from '../HomePage';
import SignUp from '../SignUp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <NavBar/>
          <Router>
            <Route exact path="/" component={HomePage} />
            <Route path="/sign-up" component={SignUp} />
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
