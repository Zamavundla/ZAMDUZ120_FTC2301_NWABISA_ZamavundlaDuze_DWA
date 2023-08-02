/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const Arrow = ({ direction, onClick }) => {
  return (
    <button className={`carousel-arrow carousel-arrow-${direction}`} onClick={onClick}>
      {/* You can customize the arrow icons here */}
      {direction === 'prev' ? '<' : '>'}
    </button>
  );
};

Arrow.propTypes = {
  direction: PropTypes.oneOf(['prev', 'next']).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Arrow;
