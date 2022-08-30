import React from 'react';
import { Route, Switch } from 'react-router-dom';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Switch>
          <Route
            path="/favorites"
            component={ Favorites }
          />
        </Switch>
      </div>
    );
  }
}

export default Favorites;
