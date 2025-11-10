import React, { useState, useContext } from 'react';
import './admin.css';
import SectionHeader from './SectionHeader';
import backgroundImage from '../../../images/admin/background-admin.jpg';
import HallManagement from './HallManagment';
import HallConfig from './HallConfig';
import PriceConfig from './PriceConfig';
import Login from './Login';
import HallSaleManagement from './HallSaleManagement';
import Api from '../../functions/Api';
import AdminContext from './AdminContext';
import MovieShowConfig from './MovieShowConfig';

function AdminPanel() {
  const backgroundImageStyle = `
        background-image: url(${backgroundImage});
        background-color: rgba(0, 0, 0, 0.5);
        background-blend-mode: multiply;
        background-size: cover;
        background-attachment: fixed;
        counter-reset: num;
    `;

  document.body.style = backgroundImageStyle;

  const { halls } = useContext(AdminContext);

  const [isLogged, setIsLogged] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async (evt, address, login, password) => {
    evt.preventDefault();
    const response = await Api.userLogin(address, login, password);
    if (response === 'Logged successful') {
      setIsLogged(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  return (
    <>
      <header className="page-header">
        <h1 className="page-header__title">
          Идём
          <span>в</span>
          кино
        </h1>
        <span className="page-header__subtitle">Администраторррская</span>
      </header>

      <main className="conf-steps">

        {!isLogged && <Login handleClick={handleLogin} loginError={loginError} />}
        {isLogged && (
        <section className="conf-step">
          <SectionHeader title="Управление залами" />
          <HallManagement />
        </section>
        )}

        {isLogged && halls.length > 0 && (
        <section className="conf-step">
          <SectionHeader title="Конфигурация залов" />
          <HallConfig />
        </section>
        )}

        {isLogged && halls.length > 0 && (
        <section className="conf-step">
          <SectionHeader title="Конфигурация цен" />
          <PriceConfig />
        </section>
        )}

        {isLogged && halls.length > 0 && (
        <section className="conf-step">
          <SectionHeader title="Сетка сеансов" />
          <MovieShowConfig />
        </section>
        )}

        {isLogged && halls.length > 0 && (
        <section className="conf-step">
          <SectionHeader title="Открыть продажи" />
          <HallSaleManagement />
        </section>
        )}
      </main>
    </>
  );
}

export default AdminPanel;
