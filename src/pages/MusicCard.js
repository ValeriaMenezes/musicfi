import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      // dataFavorites: [],
      checked: false,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    // this.setState({
    //   loading: true,
    // });
    const response = await getFavoriteSongs();
    const verificacao = response.some((item) => item.trackId === trackId);

    this.setState({
      // loading: false,
      checked: verificacao,
    });
  }

  handleChangeClick = async (track) => {
    this.setState({
      loading: true,
    });
    await addSong(track);
    this.setState({
      loading: false,
      // dataFavorites: response,
      checked: true,
    });
  };

  // Italo Lacerda e Gabriel Machado me ajudaram no requisito 8

  render() {
    const { loading, checked } = this.state;
    const { musicName, trackId, previewUrl, track } = this.props;
    return (
      loading ? <Loading /> : (
        <div>
          <p>{musicName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>

          <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              id={ trackId }
              type="checkbox"
              checked={ checked }
              onChange={ () => this.handleChangeClick(track) }
            />
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  track: PropTypes.shape.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
