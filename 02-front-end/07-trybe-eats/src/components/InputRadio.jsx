import React from 'react';
import PropTypes from 'prop-types';

function InputRadio({ dataTestid, id, name, value, onClick, labelContent }) {
  return (
    <label htmlFor={ id } className="form-check">
      <input
        type="radio"
        data-testid={ dataTestid }
        id={ id }
        name={ name }
        value={ value }
        onClick={ onClick }
        className="form-check-input"
      />
      {labelContent}
    </label>
  );
}

InputRadio.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  labelContent: PropTypes.string.isRequired,
};

export default InputRadio;
