/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Functional component representing a Season Selector.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.seasons - The array of seasons to be displayed.
 * @param {Function} props.onSelectSeason - The function to be called when a season is selected.
 * @returns {JSX.Element} - The rendered JSX element.
 */
export default function SeasonSelector({ seasons, onSelectSeason }) {
  /**
   * Handles the selection of a season.
   * @param {number} seasonNumber - The number of the selected season.
   * @function
   */
  const handleSelectSeason = (seasonNumber) => {
    onSelectSeason(seasonNumber);
  };

  return (
    <div>
      <h2>Select a Season</h2>
      <ul>
        {seasons.map((season) => (
          <li key={season.number}>
            <button onClick={() => handleSelectSeason(season.number)}>Season {season.number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Prop types for the SeasonSelector component.
 * @typedef {Object} SeasonSelectorProps
 * @property {Array} seasons - The array of seasons to be displayed.
 * @property {Function} onSelectSeason - The function to be called when a season is selected.
 */

/**
 * PropTypes for the SeasonSelector component.
 * @type {SeasonSelectorProps}
 */
SeasonSelector.propTypes = {
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelectSeason: PropTypes.func.isRequired,
};
