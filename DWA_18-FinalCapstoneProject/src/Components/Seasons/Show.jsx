/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from 'prop-types';

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
