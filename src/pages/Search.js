import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Card from '../components/Card';
// import Album from './Album';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      enabledButton: true,
      search: '',
      searchInput: '',
      loading: false,
      message: false,
      data: [],
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

  handleChangeClick = async () => {
    const { search } = this.state;
    this.setState({
      enabledButton: false,
      loading: true,
      searchInput: search,
    });
    const response = await searchAlbumsAPI(search);
    this.setState({
      loading: false,
      message: true,
      data: response,
      search: '',
    });
    // console.log(response);
  };

  render() {
    const { search,
      enabledButton,
      loading,
      message,
      data,
      searchInput,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
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
        )}
        { message && (
          <p>
            {`Resultado de álbuns de: ${searchInput}` }
          </p>
        )}
        { data.length === 0 ? (
          <p>Nenhum álbum foi encontrado</p>
        ) : data.map((item, index) => (
          <Card
            key={ index }
            artistName={ item.artistName }
            collectionName={ item.collectionName }
            artworkUrl100={ item.artworkUrl100 }
            collectionId={ item.collectionId }
          />))}
      </div>
    );
  }
}

export default Search;
