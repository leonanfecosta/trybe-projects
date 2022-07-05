import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import styles from '../styles/Login.module.css';
import title from '../styles/image/title.png';

function Login() {
  const { password, email, handleChange } = useContext(UserContext);
  const history = useHistory();
  const validateButton = () => {
    const SEIS = 6;
    if (email.includes('@')
      && email.includes('.')
      && password.length > SEIS) return false;
    return true;
  };

  const handleLoginButton = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const objeto = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(objeto));
    history.push('/foods');
  };

  return (
    <form className={ `${styles.login} form-group` }>
      <img src={ title } alt="title" className={ styles.title } />
      <div>
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ ({ target }) => handleChange(target) }
          placeholder="Digite seu e-mail"
          data-testid="email-input"
          className="form-control"
        />
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ ({ target }) => handleChange(target) }
          placeholder="Digite sua senha"
          data-testid="password-input"
          className="form-control"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ validateButton() }
          onClick={ handleLoginButton }
          className={ styles.button }
        >
          Enter
        </button>
      </div>
    </form>
  );
}

export default Login;
