import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import Header from './Header';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onCheckRegistration = props.onCheckRegistration;

  const setRegistration = props.setRegistration;

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
      .register(email, password)
      .then(data => {
        navigate('/sign-in');

        onCheckRegistration();
        setRegistration(true);
      })
      .catch(error => {
        console.error(error);

        onCheckRegistration();
        setRegistration(false);
      });
  }

  return (
    <div className="page__input">
      <h2 className="authorization__title">Регистрация</h2>
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
          {/* popup__button-save_disabled */}
          Зарегистрироваться
        </button>
        <span className="authorization__span">
          Уже зарегистрированы?
          <Link className="authorization__span_link" to="/sign-in">
            Войти
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
