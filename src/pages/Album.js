import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      dataInfo: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    // console.log('Valéria', response);
    this.setState({
      data: response[0],
      dataInfo: response.filter((_item, index) => index !== 0),
    });
  }

  render() {
    const { data, dataInfo } = this.state;
    console.log('1', dataInfo);
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ data.artistName }</h2>
        <p data-testid="album-name">{data.collectionName}</p>
        { dataInfo.map((item, index) => (
          <MusicCard
            key={ index }
            musicName={ item.trackName }
          />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};

export default Album;
