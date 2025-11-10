import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Login(props) {
  const { handleClick, loginError } = props;

  const [user, setUser] = useState({
    login: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <section className="login">
      <header className="login__header">
        <h2 className="login__title">Авторизация</h2>
      </header>
      <div className="login__wrapper">
        <form className="login__form" acceptCharset="utf-8" onSubmit={(evt) => handleClick(evt, 'user', user.login, user.password)}>
          <label className="login__label" htmlFor="mail">
            E-mail
            <input className="login__input" type="mail" placeholder="example@domain.xyz" name="login" onChange={(e) => handleChange(e)} required />
          </label>
          <label className="login__label" htmlFor="pwd">
            Пароль
            <input className="login__input" type="password" placeholder="" name="password" onChange={(e) => handleChange(e)} required />
          </label>
          <div className="text-center">
            {loginError ? <input value="Неверный логин или пароль" type="submit" className="login__button" />
              : <input value="Авторизоваться" type="submit" className="login__button" />}
          </div>
        </form>
      </div>
    </section>
  );
}

Login.propTypes = {
  handleClick: PropTypes.func,
  loginError: PropTypes.bool,
};

Login.defaultProps = {
  handleClick: () => {},
  loginError: null,
};

export default Login;
