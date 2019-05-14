/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import UserNav from 'components/UserNav';

import GlobalStyle from '../../global-styles';

/**
 * Theme to wrap entire application
 * hex is from official USC website
 * https://identity.usc.edu/print/colors/
 */
const theme = createMuiTheme({
  palette: {
    primary: { main: '#990000' },
    secondary: { main: '#FFCC00' },
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    useNextVariants: true,
  },
});

export default function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <UserNav>
              <Route exact path="/" component={HomePage} />
              <Route component={NotFoundPage} />
            </UserNav>
          </Switch>
        </BrowserRouter>
        <GlobalStyle />
      </MuiThemeProvider>
    </div>
  );
}
