import React from 'react';
import PropTypes from 'prop-types';

function HallManageItem(props) {
  const { handleDeleteHall, target } = props;

  return (
    <li>
      {target.name}
      <button
        className="conf-step__button conf-step__button-trash"
        onClick={() => handleDeleteHall(target)}
        type="button"
        aria-label="Hall button"
      />
    </li>
  );
}

HallManageItem.propTypes = {
  handleDeleteHall: PropTypes.func,
  target: PropTypes.shape({
    id: PropTypes.number,
    is_active: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    vip_price: PropTypes.number,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
    row: PropTypes.number,
    seats: PropTypes.number,
  }),
};

HallManageItem.defaultProps = {
  handleDeleteHall: () => {},
  target: null,
};

export default HallManageItem;
