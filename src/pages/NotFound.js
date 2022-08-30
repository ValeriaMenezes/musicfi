import React from 'react';
import { Route, Switch } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <Switch>
          <Route
            path="*"
            component={ NotFound }
          />
        </Switch>
      </div>
    );
  }
}

export default NotFound;
