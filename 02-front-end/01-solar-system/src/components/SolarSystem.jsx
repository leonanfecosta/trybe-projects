import React from 'react';
import Title from './Title';
import planets from '../data/planets';
import PlanetCard from './PlanetCard';
import './SolarSystem.css';

class SolarSystem extends React.Component {
  render() {
    return (
      <div className="solar-system" data-testid="solar-system">
        <Title headline="Planetas" />
        <div className="system-container">
          {planets.map((planet, index) => (<PlanetCard
            key={ index }
            planetName={ planet.name }
            planetImage={ planet.image }
            width={ planet.width }
            height={ planet.height }
          />))}
        </div>
      </div>
    );
  }
}

export default SolarSystem;
