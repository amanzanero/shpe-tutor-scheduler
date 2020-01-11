import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { getSession } from '../../utils/Authenticator';

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        getSession() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
