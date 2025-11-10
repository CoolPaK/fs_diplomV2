import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AdminContext from './AdminContext';

function HallBtnContainer(props) {
  const { halls } = useContext(AdminContext);
  const { active, setActive, name } = props;

  return (
    <ul className="conf-step__selectors-box">
      {halls.map((o) => (
        <li key={o.id}>
          <input
            type="radio"
            className="conf-step__radio"
            name={name}
            value={o.name}
            onClick={() => setActive(o.id)}
            checked={o.id === active}
          />
          <span className="conf-step__selector">{o.name}</span>
        </li>
      ))}
    </ul>
  );
}

HallBtnContainer.propTypes = {
  active: PropTypes.number,
  setActive: PropTypes.func,
  name: PropTypes.string,
};

HallBtnContainer.defaultProps = {
  setActive: () => {},
  name: null,
  active: null,
};

export default HallBtnContainer;
