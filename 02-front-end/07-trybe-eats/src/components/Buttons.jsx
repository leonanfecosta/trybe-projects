import React from 'react';
import PropTypes from 'prop-types';

function Buttons({ name, dataTestid, onClick, className }) {
  return (
    <button
      type="button"
      data-testid={ dataTestid }
      onClick={ onClick }
      name={ name }
      className={ className }
      style={ { minWidth: '24%' } }
    >
      {name}
    </button>
  );
}

Buttons.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default Buttons;
