import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/Header.module.css';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, curr) => {
      const result = acc + curr.value * curr.exchangeRates[curr.currency].ask;
      return result;
    }, 0);
    return (
      <header className={ styles.header }>
        <div className={ styles.headerLogo }>
          <h1>TrybeWallet</h1>
          <img src="https://img.icons8.com/color/96/000000/wallet--v1.png" alt="wallet" />
        </div>
        <div className={ styles.headerInfo }>
          <h3 data-testid="email-field">{`Usuário: ${email}`}</h3>
          <p data-testid="total-field">{`Valor Total: R$${total.toFixed(2)}`}</p>
          <img src="https://img.icons8.com/color/96/000000/brazil-circular.png" alt="bandeira" />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
