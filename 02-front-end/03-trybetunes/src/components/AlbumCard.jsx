import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { name, url, artistName, tracks, collectionId } = this.props;
    return (
      <div>
        <h2>{ name }</h2>
        <img src={ url } alt={ name } />
        <p>{ artistName }</p>
        <p>{`Faixas: ${tracks}`}</p>
        <Link
          to={ `album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Clique aqui
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  tracks: PropTypes.number.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default AlbumCard;
