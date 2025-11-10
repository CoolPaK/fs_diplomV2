import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import closeImage from '../../../images/admin/close.png';

function HallAddPopup(props) {
  const { handleClose, handleSubmit } = props;

  const [name, setName] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <div className="popup active">
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Добавление зала
              <span
                className="popup__dismiss"
                role="button"
                tabIndex={0}
                onClick={handleClose}
                onKeyPress={(e) => { if (e.key === 'Enter') handleClose(); }}
              >
                <img src={closeImage} alt="Закрыть" />
              </span>
            </h2>
          </div>
          <div className="popup__wrapper">
            <form action="add_hall" method="post" acceptCharset="utf-8" onSubmit={(e) => handleSubmit(e, name)}>
              <label className="conf-step__label conf-step__label-full-size" htmlFor="name">
                Название зала
                <input className="conf-step__input" type="text" placeholder="Например, &laquo;Зал 1&raquo;" name="name" required value={name} onChange={(e) => handleChange(e)} />
              </label>
              <div className="conf-step__buttons text-center">
                <input type="submit" value="Добавить зал" className="conf-step__button conf-step__button-accent" />
                <button className="conf-step__button conf-step__button-regular" onClick={handleClose} type="button">Отменить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

HallAddPopup.propTypes = {
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
};

HallAddPopup.defaultProps = {
  handleClose: () => {},
  handleSubmit: () => {},
};

export default HallAddPopup;
