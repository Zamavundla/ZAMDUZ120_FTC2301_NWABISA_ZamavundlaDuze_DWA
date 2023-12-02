/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from 'prop-types';

/**
 * Functional component representing details of a show.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.show - The show details.
 * @param {string} props.show.title - The title of the show.
 * @param {string} props.show.image - The URL of the show's image.
 * @param {string} props.show.description - The description of the show.
 * @param {Array} props.show.seasons - The array of seasons for the show.
 * @param {string} props.show.updated - The last update date of the show.
 * @param {Function} props.onClose - The function to close the show details.
 * @returns {JSX.Element} - The rendered JSX element.
 */
const Show = ({ show, onClose }) => {
  return (
    <div className="ShowDetails">
      <div className="ShowDetailsHeader">
        <h2>{show.title}</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="ShowImageWrapper">
        <img className="ShowImage" src={show.image} alt={show.title} />
      </div>
      <div className="ShowContent">
        <p className="ShowDescription">Description: {show.description}</p>
        <p>Seasons: {show.seasons.length}</p>
        <div className="SeasonsList">
          {show.seasons.map((season) => (
            <div key={season.id} className="SeasonCard">
              <h3>{season.title}</h3>
              {/* <img src={season.image} alt={season.title} /> */}
              <p>Episodes: {season.episodes.length}</p>
              <ul>
                {season.episodes.map((episode) => (
                  <li key={episode.id}>
                    <p>{episode.title}</p>
                    {/* <img src={episode.image} alt={episode.title} /> */}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p>
          Date Updated:{" "}
          {new Date(show.updated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

/**
 * Prop types for the Show component.
 * @typedef {Object} ShowProps
 * @property {Object} show - The show details.
 * @property {string} show.title - The title of the show.
 * @property {string} show.image - The URL of the show's image.
 * @property {string} show.description - The description of the show.
 * @property {Array} show.seasons - The array of seasons for the show.
 * @property {string} show.updated - The last update date of the show.
 * @property {Function} onClose - The function to close the show details.
 */

/**
 * PropTypes for the Show component.
 * @type {ShowProps}
 */
Show.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    seasons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        episodes: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
    updated: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Show;
