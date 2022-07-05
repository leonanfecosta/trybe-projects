import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmail } from '../actions';
import styles from '../styles/Login.module.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSubmit = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(setEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    // Validação de email , fonte: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const isEmailValid = regex.test(email);
    const PASSWORD_LENGTH = 6;
    const isPasswordValid = password.length >= PASSWORD_LENGTH;
    return (
      <div className={styles.container}>
        <div className={styles.leftLogin}>
          <img src={require('../images/wallet-animate.svg')} alt="logo" />
        </div>
        <div className={styles.rightLogin}>
          <div className={styles.cardLogin}>
            <h1>Login</h1>
            <div className={styles.inputContainer}>
              <input
                type="text"
                id="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
                data-testid="email-input"
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                type="password"
                placeholder="Senha"
                id="password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
                data-testid="password-input"
              />
            </div>
            <button
              type="button"
              disabled={!(isEmailValid && isPasswordValid)}
              onClick={this.handleSubmit}
              className={styles.btnLogin}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
