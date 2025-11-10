import React from 'react';
import PropTypes from 'prop-types';

function SectionHeader(props) {
  const { title } = props;

  const onClick = (event) => {
    event.currentTarget.classList.toggle('conf-step__header_closed');
    event.currentTarget.classList.toggle('conf-step__header_opened');
  };

  return (
    <header
      className="conf-step__header conf-step__header_closed"
      onClick={(event) => onClick(event)}
      aria-label="Open button"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') onClick(e); }}
    >
      <h2 className="conf-step__title">{title}</h2>
    </header>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string,
};

SectionHeader.defaultProps = {
  title: null,
};

export default SectionHeader;
