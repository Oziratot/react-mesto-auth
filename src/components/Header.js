import React from 'react'
import { Link, useLocation } from 'react-router-dom';

function Header({ loggedIn, email, onLogout }) {
  const location = useLocation();
  const path = location.pathname;
  return (
      <header className="header">
        <div className="header__logo"></div>
        <div className="header__container">
          {loggedIn ? (
            <>
              <p className="header__email">{email}</p>
              <button className="header__logout-btn" onClick={onLogout}>Выйти</button>
            </>
          ) : (
            <>
              <Link to={path === "/sign-in" ? "sign-up" : "sign-in"} className="header__link">{path === "/sign-in" ? "Зарегистрироваться" : "Войти"}</Link>
            </>
          )}
        </div>
      </header>
  );
}

export default Header