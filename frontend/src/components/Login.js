import { useNavigate } from 'react-router-dom';
import React from 'react';
import * as auth from '../utils/auth';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    auth
      .authorize(email, password)
      .then(data => {
        localStorage.setItem('jwt', data.token);
        props.setLoggedIn(true);
        navigate('/');
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <div className="page__input">
      <h2 className="authorization__title">Вход</h2>
      <form noValidate name="sign-in" className="authorization__fields" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="authorization__field"
          id="email-input"
          required
          minLength="2"
          maxLength="40"
          value={email || ''}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="authorization__field"
          id="password-input"
          required
          minLength="2"
          maxLength="200"
          value={password || ''}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="authorization__button-submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
