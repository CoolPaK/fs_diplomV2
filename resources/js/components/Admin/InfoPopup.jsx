import React from 'react';
import PropTypes from 'prop-types';
import closeImage from '../../../images/admin/close.png';

function InfoPopup(props) {
  const { handleClose, text } = props;

  return (
    <div className="popup active">
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__header">
            <h2 className="popup__title">
              {text}
              <span
                className="popup__dismiss"
                onClick={() => handleClose(false)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => { if (e.key === 'Enter') handleClose(false); }}
              >
                <img src={closeImage} alt="Закрыть" />
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

InfoPopup.propTypes = {
  handleClose: PropTypes.func,
  text: PropTypes.string,
};

InfoPopup.defaultProps = {
  handleClose: () => {},
  text: null,
};

export default InfoPopup;
