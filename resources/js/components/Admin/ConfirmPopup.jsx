import React from 'react';
import PropTypes from 'prop-types';
import closeImage from '../../../images/admin/close.png';

function ConfirmPopup(props) {
  const {
    reset, submit, data, actionName, question, name,
  } = props;

  return (
    <div className="popup active">
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              {actionName}
              <span
                className="popup__dismiss"
                role="button"
                tabIndex={0}
                onClick={reset}
                onKeyPress={(e) => { if (e.key === 'Enter') reset(); }}
              >
                <img src={closeImage} alt="Закрыть" />
              </span>
            </h2>
          </div>
          <div className="popup__wrapper">
            <form action="hall" method="post" acceptCharset="utf-8" onSubmit={(e) => submit(e, data)}>
              <p className="conf-step__paragraph">
                {question}
                <span>{name}</span>
                ?
              </p>
              <div className="conf-step__buttons text-center">
                <input type="submit" value="Удалить" className="conf-step__button conf-step__button-accent" />
                <button className="conf-step__button conf-step__button-regular" type="button" onClick={reset}>Отменить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// reset, submit, data, actionName, question, name,

ConfirmPopup.propTypes = {
  reset: PropTypes.func,
  submit: PropTypes.func,
  question: PropTypes.string,
  actionName: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.shape({
    id: PropTypes.number,
    film_id: PropTypes.number,
    hall_id: PropTypes.number,
    updated_at: PropTypes.string,
    created_at: PropTypes.string,
    start_time: PropTypes.string,
    start_day: PropTypes.string,
    ordered: PropTypes.string,
    movie_show_duration: PropTypes.number,
    film_name: PropTypes.string,
  }),
};

ConfirmPopup.defaultProps = {
  reset: () => {},
  submit: () => {},
  question: null,
  actionName: null,
  name: null,
  data: null,
};

export default ConfirmPopup;
