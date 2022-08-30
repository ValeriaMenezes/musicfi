import React from 'react';
import { Route, Switch } from 'react-router-dom';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Switch>
          <Route
            path="/search"
            component={ Search }
          />
        </Switch>
      </div>
    );
  }
}

export default Search;
