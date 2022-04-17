import React from 'react';
import Form from './Form';
import Card from './Card';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      cards: [],
      filterName: '',
      filterRare: 'todas',
      filterCards: [],
      hasFilter: false,

    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleFilter = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.updateFilter());
  }

  updateFilter = () => {
    const { cards, filterName, filterRare } = this.state;

    const filterByName = cards
      .filter((card) => card.cardName.toLowerCase()
        .includes(filterName.toLowerCase()) || filterName === '');

    const filterByRare = filterRare === 'todas' ? filterByName : filterByName
      .filter((card) => card.cardRare === filterRare);

    this.setState({
      filterCards: filterByRare,
      hasFilter: true,
    });
  }

  validateInputs = (state) => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = state;

    const MAX_ATRR = 90;
    const MAX_SUM_ATTR = 210;

    if (
      [cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage, cardRare]
        .some((item) => item.length === 0)) {
      return true;
    }

    if (
      [cardAttr1, cardAttr2, cardAttr3].some((item) => item > MAX_ATRR || item < 0)) {
      return true;
    }

    if (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) > MAX_SUM_ATTR) {
      return true;
    }

    return false;
  }

  clearForm = (prevState) => ({
    ...prevState,
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
  });

  saveCard = (prevState) => {
    const { cards, ...newCard } = prevState;
    return ({
      ...prevState,
      cards: prevState.cards.concat(newCard),
    });
  }

  hasTrunfo = () => {
    const { cards } = this.state;
    return cards.some((card) => card.cardTrunfo === true);
  }

  onSaveButtonClick = () => {
    this.setState(this.saveCard);
    this.setState(this.clearForm, () => {
      if (this.hasTrunfo()) {
        this.setState({ hasTrunfo: true });
      }
    });
  }

  deleteCard(event) {
    const { cards } = this.state;
    const { name } = event.target;
    const newCards = cards.filter((card) => card.cardName !== name);

    this.setState({ cards: newCards }, () => {
      if (!this.hasTrunfo()) {
        this.setState({ hasTrunfo: false });
      }
    });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      filterName,
      filterCards,
      hasFilter,
      cards,
    } = this.state;

    const cardsFilter = hasFilter ? filterCards : cards;

    return (

      <main>
        <Form
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ this.validateInputs(this.state) }
        />
        <section>
          <h1>Pré-Visualização</h1>
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
          />
        </section>

        <section>
          <h2>Todas as Cartas</h2>
          <h3>Filtros de Busca</h3>
          <input
            type="text"
            name="filterName"
            value={ filterName }
            onChange={ this.handleFilter }
            placeholder="Digite o nome da carta"
            data-testid="name-filter"
          />

          <select
            name="filterRare"
            id="filterRare"
            data-testid="rare-filter"
            onChange={ this.handleFilter }
          >
            <option value="todas">Todas</option>
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito Raro</option>

          </select>
          {cardsFilter
            .map((card, index) => (
              <>
                <Card
                  key={ index }
                  cardName={ card.cardName }
                  cardDescription={ card.cardDescription }
                  cardAttr1={ card.cardAttr1 }
                  cardAttr2={ card.cardAttr2 }
                  cardAttr3={ card.cardAttr3 }
                  cardImage={ card.cardImage }
                  cardRare={ card.cardRare }
                  cardTrunfo={ card.cardTrunfo }
                />
                <button
                  type="button"
                  name={ card.cardName }
                  onClick={ (event) => this.deleteCard(event) }
                  data-testid="delete-button"
                >
                  Remover Carta

                </button>

              </>
            ))}
        </section>
      </main>
    );
  }
}

export default Index;
