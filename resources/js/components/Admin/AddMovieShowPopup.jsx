import React, {
  useState,
} from 'react';
import PropTypes from 'prop-types';
import closeImage from '../../../images/admin/close.png';

function AddMovieShowPopup(props) {
  const {
    handleClose, handleSubmit, hall, film, error,
  } = props;
  const [time, setTime] = useState('00:00');

  const handleChange = (e) => {
    const { target } = e;
    if (target.value === '') {
      setTime('00:00');
    } else {
      setTime(target.value);
    }
  };

  return (
    <div className="popup active">
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              Добавление сеанса
              <span
                className="popup__dismiss"
                role="button"
                tabIndex={0}
                onClick={() => handleClose(false)}
                onKeyPress={(e) => { if (e.key === 'Enter') handleClose(false); }}
              >
                <img src={closeImage} alt="Закрыть" />
              </span>
            </h2>
          </div>
          <div className="popup__wrapper">
            <form action="add_movie" method="post" acceptCharset="utf-8" onSubmit={(e) => handleSubmit(e, film, hall.id, time)}>
              <p className="conf-step__paragraph">
                Добавление сеанса в
                {hall.name}
              </p>
              <p className="conf-step__paragraph">
                Фильм
                {film.name}
              </p>
              {time && (
              <label className="conf-step__label conf-step__label-full-size" htmlFor="name">
                Время начала
                <input className="conf-step__input" type="time" name="start_time" value={time} onChange={(e) => handleChange(e)} required />
              </label>
              )}
              <p className="conf-step__paragraph">{error}</p>
              <div className="conf-step__buttons text-center">
                <input type="submit" value="Добавить" className="conf-step__button conf-step__button-accent" />
                <button className="conf-step__button conf-step__button-regular" onClick={() => handleClose(false)} type="button">Отменить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}

AddMovieShowPopup.propTypes = {
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  hall: PropTypes.shape({
    id: PropTypes.number,
    is_active: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    row: PropTypes.number,
    seats: PropTypes.number,
    updated_at: PropTypes.string,
    created_at: PropTypes.string,
    vip_price: PropTypes.number,
  }),
  film: PropTypes.shape({
    country: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.number,
    id: PropTypes.number,
    created_at: PropTypes.string,
    name: PropTypes.string,
    poster: PropTypes.string,
    updated_at: PropTypes.string,
  }),
  error: PropTypes.string,
};

AddMovieShowPopup.defaultProps = {
  handleClose: () => {},
  handleSubmit: () => {},
  hall: null,
  film: null,
  error: null,
};

export default AddMovieShowPopup;
