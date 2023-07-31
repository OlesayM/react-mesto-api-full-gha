import { React, useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegistration }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration({
      password: password,
      email: email,
    });
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <section className="register">
      <h3 className="popup__title"> Регистрация </h3>
      <form className="popup__form" onSubmit={handleSubmit}>
        <input
          id="register-email-input"
          className="popup__input popup__input_theme_dark"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email || ''}
          onChange={handleChangeEmail}
        />
        <span id="email-input-error" className="popup__error">
          {' '}
        </span>

        <input
          id="register-password-input"
          className="popup__input popup__input_theme_dark"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          value={password || ''}
          onChange={handleChangePassword}
        />
        <span id="password-input-error" className="popup__error">
          {' '}
        </span>

        <button
          className="popup__button popup__button_theme_white"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <div className="register__container">
          <p className="register__question">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="register__link">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
