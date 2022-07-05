import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Explore.module.css';
import foodPlate from '../styles/image/prato_de_comida.png';

function Explore() {
  return (
    <div className={ styles.explore }>
      <Header title="Explore" showButton={ false } route="null" />
      <nav>
        <Link to="/explore/foods">
          <button
            type="button"
            data-testid="explore-foods"
            className={ styles.buttonFood }
          >
            Explore Foods

          </button>
        </Link>
        <Link to="/explore/drinks">
          <button
            type="button"
            data-testid="explore-drinks"
            className={ styles.buttonDrink }
          >
            Explore Drinks
          </button>
        </Link>
      </nav>
      <img src={ foodPlate } alt="prato de comida" className={ styles.foodPlate } />
      <Footer />
    </div>
  );
}

export default Explore;
