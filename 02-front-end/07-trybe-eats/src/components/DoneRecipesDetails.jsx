import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import styles from '../styles/DoneRecipes.module.css';

function DoneRecipesDetails({
  id,
  type,
  name,
  image,
  index,
  tags,
  nationality,
  category,
  alcoholicOrNot,
  doneDate,
}) {
  const [wasCopied, setWasCopied] = useState(false);

  return (
    <div key={ id } className={ styles.doneRecipesCards }>
      <div className={ styles.parte1 }>
        <Link to={ `${type}s/${id}` }>
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <aside>
          {type === 'food' && (tags || []).map((tag) => (
            <p
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
              className={ styles.tags }
            >
              {tag}
            </p>
          ))}
        </aside>
      </div>
      <div className={ styles.parte2 }>
        <Link to={ `${type}s/${id}` }>
          <h4
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </h4>
        </Link>

        {type === 'food' && (
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${nationality} - ${category}`}
          </p>
        )}

        {type === 'drink' && (
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {alcoholicOrNot}
          </p>
        )}

        <p data-testid={ `${index}-horizontal-done-date` }>
          {doneDate}
        </p>

        <input
          type="image"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => {
            copy(`http://localhost:3000/${type}s/${id}`);
            setWasCopied(true);
          } }
          src={ shareIcon }
          alt="shareIcon"
          style={ { width: '15px' } }
        />
        {wasCopied && (
          <p
            data-testid={ `${index}-horizontal-share-btn` }
            style={ { fontSize: '12px' } }
          >
            Link copied!
          </p>
        )}

      </div>

    </div>
  );
}

DoneRecipesDetails.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
};

export default DoneRecipesDetails;
