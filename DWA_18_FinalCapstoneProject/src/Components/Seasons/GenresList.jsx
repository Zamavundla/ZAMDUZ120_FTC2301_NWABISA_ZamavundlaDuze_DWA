/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types'

export default function GenresList({ genreId }) {
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

  // Function to get genre name by its ID
  const getGenreNameById = (genreId) => {
    const genre = genres.find((genre) => genre.id === genreId);
    return genre ? genre.title : 'Unknown Genre';
  };

  return (
    <div>
      <h2>Genres</h2>
      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            {genre.id === genreId ? <strong>{genre.title}</strong> : genre.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

GenresList.propTypes = {
  genreId: PropTypes.number 
};
