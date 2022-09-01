import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
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

  handleChangeClick = async (track) => {
    this.setState({
      loading: true,
    });
    // const { match: { params: { id } } } = this.props;
    await addSong(track);
    // console.log('2', id);
    this.setState({
      loading: false,
      // dataFavorites: response,
      checked: true,
    });
  };

  // handleChangeClick = async ({ target }) => {
  //   const {  }
  //   await addSong(track);
  //   console.log('chamou');
  // };

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
