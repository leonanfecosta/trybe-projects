import React from 'react';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.updateFavorites();
  }

  updateFavorites = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState(() => ({ loading: false, favorites }));
  }

  render() {
    const { loading, favorites } = this.state;
    return (
      <section data-testid="page-favorites">
        {loading ? <Loading /> : (
          favorites.map((music) => (
            <div key={ music.trackId }>
              <img src={ music.artworkUrl100 } alt={ music.collectionName } />
              <MusicCard
                name={ music.trackName }
                url={ music.previewUrl }
                music={ music }
                isFavorite
                updateFavorites={ this.updateFavorites }
              />

            </div>
          ))
        )}
      </section>);
  }
}

export default Favorites;
