import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      data: [],

    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const response = await getFavoriteSongs();
    this.setState({
      loading: false,
      data: response,
    });
    console.log(response);
  }

  handleCallback = async () => {
    this.setState({
      loading: true,
    });
    const { data } = this.state;
    const newResponse = await getFavoriteSongs();
    this.setState({
      loading: false,
    });
    if (data !== newResponse) {
      this.setState({
        loading: false,
        data: newResponse,
      });
    }
  };

  render() {
    const { loading, data } = this.state;
    return (
      loading ? <Loading />
        : (
          <div data-testid="page-favorites">
            <Header />
            {
              data.map((item, index) => (
                <MusicCard
                  key={ index }
                  handleCallback={ this.handleCallback }
                  musicName={ item.trackName }
                  previewUrl={ item.previewUrl }
                  trackId={ item.trackId }
                  track={ item }
                />

              ))
            }
          </div>

        )
    );
  }
}

export default Favorites;
