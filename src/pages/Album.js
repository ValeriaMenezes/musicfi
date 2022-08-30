import React from 'react';
import { Route, Switch } from 'react-router-dom';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Switch>
          <Route
            path="/album/:id"
            component={ Album }
          />
        </Switch>
      </div>
    );
  }
}

export default Album;
