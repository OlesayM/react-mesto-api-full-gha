import { React, useState } from 'react';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin({
      password: password,
      email: email,
    });
  }

  return (
    <section className="login" onSubmit={handleSubmit}>
      <h3 className="popup__title">Вход</h3>
      <form className="popup__form" >
        <input
          id="login-email-input"
          className="popup__input popup__input_theme_dark"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={email || ''}
          onChange={handleChangeEmail}
        />
        <span id="email-input-error" className="popup__error"></span>

        <input
          id="login-password-input"
          className="popup__input popup__input_theme_dark"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          value={password || ''}
          onChange={handleChangePassword}
        />
        <span id="password-input-error" className="popup__error"></span>

        <button
          className="popup__button popup__button_theme_white"
          type="submit"
        >
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
