import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';
import styles from '../styles/ExpensesTable.module.css';

class ExpensesTable extends React.Component {
  render() {
    const titles = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Excluir',
    ];
    const { expenses, dispatch } = this.props;
    return (
      <table className={styles.table}>
        <thead className={styles.tableTitles}>
          <tr>
            {titles.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {expenses.map((expense) => {
            const coin = expense.exchangeRates[expense.currency];
            const { name, ask } = coin;
            const coinName = name.split('/')[0];
            return (
              <tr key={expense.id} className={ styles.tableInfo }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{coinName}</td>
                <td>{Number(ask).toFixed(2)}</td>
                <td>{Number(expense.value * ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    className={styles.btnDelete}
                    data-testid="delete-btn"
                    type="button"
                    onClick={() => dispatch(deleteExpense(expense))}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
