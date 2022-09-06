import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checked: false,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const response = await getFavoriteSongs();
    const verificacao = response.some((item) => item.trackId === trackId);

    this.setState({
      checked: verificacao,
    });
  }

  handleChangeClick = async (track, paramFunc) => {
    const { handleCallback } = this.props;
    this.setState({
      loading: true,
    });
    const { checked } = this.state;
    if (checked) {
      await removeSong(track);
      this.setState({
        loading: false,
        checked: false,
      });
    } else {
      await addSong(track);
      console.log(track);
      this.setState({
        checked: true,
        loading: false,
      });
    }
    if (handleCallback) {
      paramFunc();
    }
  };

  // Italo Lacerda e Gabriel Machado me ajudaram no requisito 8 e 9

  render() {
    const { loading, checked } = this.state;
    const { musicName, trackId, previewUrl, track, handleCallback } = this.props;
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
              onChange={ () => this.handleChangeClick(track, handleCallback) }
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
  handleCallback: PropTypes.func.isRequired,
};

export default MusicCard;
