import React from 'react';
import { Route, Switch } from 'react-router-dom';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Switch>
          <Route
            path="/profile/edit"
            component={ ProfileEdit }
          />
        </Switch>
      </div>
    );
  }
}

export default ProfileEdit;
