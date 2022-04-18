import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { value, type, name, onInputChange, label } = this.props;
    return (
      <label htmlFor={ name }>
        {label}
        <input
          type={ type }
          name={ name }
          value={ value }
          onChange={ onInputChange }
          data-testid={ `${name}-input` }
        />
      </label>);
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
