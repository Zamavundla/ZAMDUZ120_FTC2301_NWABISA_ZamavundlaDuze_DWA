/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const Arrow = ({ direction, onClick }) => {
  return (
    <button
      className={`carousel-arrow carousel-arrow-${direction}`}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center', // Center the arrow content along the y-axis
        justifyContent: 'center', // Center the arrow content along the x-axis
        position: 'absolute',
        top: '50%', // Position the arrows at the center vertically
        transform: direction === 'prev' ? 'translateY(-50%)' : 'translateY(-50%)', // Adjust the arrow position
        zIndex: 1,
        background: '#6666', // Set a background color for the arrows
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        fontSize: '24px',
        color: '#fff', // Set the color of the arrow icons
        width: '40px', // Set the width of the arrows
        height: '40px', // Set the height of the arrows
        borderRadius: '50%', // Make the arrows circular
      }}
    >
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
