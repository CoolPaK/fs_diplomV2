import React from 'react';
import PropTypes from 'prop-types';

function InterfaceBtnContainer(props) {
  const { reset, accept } = props;

  return (
    <fieldset className="conf-step__buttons text-center">
      <button className="conf-step__button conf-step__button-regular" onClick={reset} type="button">Отмена</button>
      <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" onClick={accept} />
    </fieldset>
  );
}

InterfaceBtnContainer.propTypes = {
  reset: PropTypes.func,
  accept: PropTypes.func,
};

InterfaceBtnContainer.defaultProps = {
  reset: () => {},
  accept: () => {},
};

export default InterfaceBtnContainer;
