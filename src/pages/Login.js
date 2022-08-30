import React from 'react';
import { Route, Switch } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <Switch>
          <Route
            exact
            path="/"
            component={ Login }
          />
        </Switch>
      </div>
    );
  }
}

export default Login;
