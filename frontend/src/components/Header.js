import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();

  function signOut() {
    localStorage.removeItem('jwt');
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место " />
      <div className="header__nav">
        {location.pathname == '/' && props.loggedIn && (
          <p className="header__email">{props.userData.email}</p>
        )}
        {location.pathname == '/' && (
          <Link className="header__exit" onClick={signOut} to="/sign-in">
            Выйти
          </Link>
        )}
      </div>
      {location.pathname == '/sign-in' && (
        <Link className="header__registration" to={'/sign-up'}>
          {'Регистрация'}
        </Link>
      )}
      {location.pathname == '/sign-up' && (
        <Link className="header__login" to={'/sign-in'}>
          {'Войти'}
        </Link>
      )}
    </header>
  );
}

export default Header;
