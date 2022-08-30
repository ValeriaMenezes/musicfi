import React from 'react';
import { Route, Switch } from 'react-router-dom';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Switch>
          <Route
            path="/profile"
            component={ Profile }
          />
        </Switch>
      </div>
    );
  }
}

export default Profile;
