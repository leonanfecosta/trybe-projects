import React from 'react';
import PropTypes from 'prop-types';
import './PlanetCard.css';

class PlanetCard extends React.Component {
  render() {
    const { planetName, planetImage, width, height } = this.props;

    return (
      <div className="planet-card" data-testid="planet-card">
        <img
          src={ planetImage }
          alt={ `Planeta ${planetName}` }
          width={ width }
          height={ height }
        />
        <p className="planet-name" data-testid="planet-name">{planetName}</p>
      </div>
    );
  }
}

PlanetCard.propTypes = {
  planetName: PropTypes.string.isRequired,
  planetImage: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default PlanetCard;
