/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

export default function GenresList({ genreIds }) {
  const genres = [
    { id: 1, title: 'Personal Growth' },
    { id: 2, title: 'True Crime and Investigative Journalism' },
    { id: 3, title: 'History' },
    { id: 4, title: 'Comedy' },
    { id: 5, title: 'Entertainment' },
    { id: 6, title: 'Business' },
    { id: 7, title: 'Fiction' },
    { id: 8, title: 'News' },
    { id: 9, title: 'Kids and Family' },
  ];

  // Function to get genre name(s) by their ID(s)
  const getGenreNamesByIds = (genreIds) => {
    const genreNames = genreIds.map((id) => {
      const genre = genres.find((genre) => genre.id === id);
      return genre ? genre.title : 'Unknown Genre';
    });
    return genreNames.join(', ');
  };

  return (
    <div>
      <h2>Genres</h2>
      <div className="genres-list">
        {genreIds.map((genreId) => {
          const genre = genres.find((genre) => genre.id === genreId);
          return (
            <button key={genreId} className="genre-button">
              {genre && <span className="genre-name">{genre.title}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

GenresList.propTypes = {
  genreIds: PropTypes.arrayOf(PropTypes.number),
};
