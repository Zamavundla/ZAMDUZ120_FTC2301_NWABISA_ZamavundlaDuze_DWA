/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'; 

export default function SeasonSelector({ seasons, onSelectSeason }) {
  return (
    <div>
      <h2>Select a Season</h2>
      <ul>
        {seasons.map((season) => (
          <li key={season.number}>
            <button onClick={() => onSelectSeason(season.number)}>Season {season.number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

SeasonSelector.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelectSeason: PropTypes.func.isRequired,
};
