import React from 'react';
import logoPath from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ logout, email }) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="logo" src={logoPath} alt="Логотип" />
      <div className="header__container">
        <p className="header__email">{email}</p>
        {location.pathname === '/sign-in' && (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        )}
        {location.pathname === '/sign-up' && (
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        )}
        {location.pathname === '/' && (
          <Link to="/sign-in" className="header__link" onClick={logout}>
            Выйти
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
