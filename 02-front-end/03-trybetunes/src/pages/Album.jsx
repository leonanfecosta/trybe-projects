import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      musics: [],
      favorites: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    // console.log(id);
    const musics = await getMusics(id);
    const favorites = await getFavoriteSongs();
    this.setState({ musics, loading: false, favorites });
  }

  render() {
    const { musics, loading, favorites } = this.state;
    console.log(musics);

    return (
      <section data-testid="page-album">
        {loading ? <Loading /> : (
          <>
            <section>
              <img
                src={ musics[0].artworkUrl100 }
                alt={ musics[0].collectionCensoredName }
              />
              <h1
                data-testid="album-name"
              >
                {musics[0].collectionName}
              </h1>
              <p
                data-testid="artist-name"
              >
                {musics[0].artistName}
              </p>
            </section>
            <section>
              {musics.length > 0 && musics.map((music, index) => (index > 0 && (
                <MusicCard
                  key={ music.trackId }
                  name={ music.trackName }
                  url={ music.previewUrl }
                  music={ music }
                  isFavorite={ favorites.some((fav) => fav.trackId === music.trackId) }
                />
              )))}
            </section>
          </>
        )}
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
