import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmail } from '../actions';

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
      <div>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="email"
          value={ email }
          onChange={ (e) => this.setState({ email: e.target.value }) }
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="password"
          value={ password }
          onChange={ (e) => this.setState({ password: e.target.value }) }
          data-testid="password-input"
        />
        <button
          type="button"
          disabled={ !(isEmailValid && isPasswordValid) }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
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
