import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      enabledButton: true,
      search: '',
    };
  }

  handleChangeInput = ({ target }) => {
    const { value } = target;
    const minInput = 2;
    this.setState({
      search: value,
    }, () => {
      if (value.length >= minInput) {
        return this.setState({ enabledButton: false });
      }
      return this.setState({ enabledButton: true });
    });
  };

  // handleChangeClick = () => {

  // };

  render() {
    const { search, enabledButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        <form>
          <label htmlFor="search-input">
            <input
              data-testid="search-artist-input"
              value={ search }
              onChange={ this.handleChangeInput }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ enabledButton }
            onClick={ this.handleChangeClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
