import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

class Form extends React.Component {
  render() {
    const {
      onInputChange,
      onSaveButtonClick,
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
    } = this.props;

    return (
      <section>
        <Input
          value={ cardName }
          type="text"
          name="cardName"
          onInputChange={ onInputChange }
          label="Nome:"
        />
        <Input
          value={ cardDescription }
          type="textarea"
          name="cardDescription"
          onInputChange={ onInputChange }
          label="Descrição:"
        />
        <Input
          value={ cardAttr1 }
          type="number"
          name="cardAttr1"
          onInputChange={ onInputChange }
          label="Atributo 1:"
        />

        <Input
          value={ cardAttr2 }
          type="number"
          name="cardAttr2"
          onInputChange={ onInputChange }
          label="Atributo 2:"
        />
        <Input
          value={ cardAttr3 }
          type="number"
          name="cardAttr3"
          onInputChange={ onInputChange }
          label="Atributo 3:"
        />

        <Input
          value={ cardImage }
          type="text"
          name="cardImage"
          onInputChange={ onInputChange }
          label="Imagem:"
        />

        <select
          value={ cardRare }
          name="cardRare"
          onChange={ onInputChange }
          data-testid="rare-input"
        >
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito Raro</option>
        </select>

        { hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p> : <input
          value={ cardTrunfo }
          checked={ cardTrunfo }
          type="checkbox"
          name="cardTrunfo"
          onChange={ onInputChange }
          data-testid="trunfo-input"
          label="Super Trybe Trunfo"
        /> }

        <button
          value="Salvar"
          type="button"
          name="save"
          data-testid="save-button"
          onClick={ onSaveButtonClick }
          disabled={ isSaveButtonDisabled }
        >
          Salvar
        </button>
      </section>
    );
  }
}

Form.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
};

export default Form;
