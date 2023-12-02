/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Show from "./Show.jsx";

/**
 * Component representing a list of shows with various functionalities.
 * @component
 */
const ShowList = () => {
  /** State for storing show previews */
  const [previews, setPreviews] = useState([]);
  /** State indicating whether data is loading */
  const [loading, setLoading] = useState(true);
  /** State for storing expanded show previews */
  const [showPreviews, setShowPreviews] = useState({});
  /** State for storing details of a selected show */
  const [selectedShow, setSelectedShow] = useState(null);
  /** State for storing favorite shows */
  const [favoriteShows, setFavoriteShows] = useState([]);
  /** State for filtering shows by title */
  const [filterText, setFilterText] = useState("");

  /**
   * Fetches show data from the API.
   * @async
   * @function
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app/shows");
        const data = await response.json();
        const showsWithFavorites = data.map((show) => ({
          ...show,
          isFavorite: false,
        }));
        setPreviews(showsWithFavorites);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching show data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Toggles the visibility of show previews.
   * @param {string} showId - The ID of the show.
   * @function
   */
  const togglePreview = (showId) => {
    setShowPreviews((prevShowPreviews) => ({
      ...prevShowPreviews,
      [showId]: !prevShowPreviews[showId],
    }));
  };

  /**
   * Fetches details of a specific show.
   * @async
   * @param {string} showId - The ID of the show.
   * @function
   */
  const fetchShowDetails = async (showId) => {
    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${showId}`);
      const data = await response.json();
      setSelectedShow(data);
    } catch (error) {
      console.error("Error fetching show details:", error);
    }
  };

  /**
   * Closes the details view of a selected show.
   * @function
   */
  const closeShowDetails = () => {
    setSelectedShow(null);
  };

  /**
   * Formats a date into a human-readable string.
   * @param {string} date - The date to be formatted.
   * @returns {string} - The formatted date.
   * @function
   */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  /**
   * Toggles the favorite status of a show.
   * @param {string} showId - The ID of the show.
   * @function
   */
  const toggleFavorite = (showId) => {
    setPreviews((prevPreviews) =>
      prevPreviews.map((show) =>
        show.id === showId ? { ...show, isFavorite: !show.isFavorite } : show
      )
    );

    if (!favoriteShows.find((favorite) => favorite.id === showId)) {
      setFavoriteShows((prevFavorites) => [
        ...prevFavorites,
        { id: showId, timestamp: new Date() },
      ]);
    } else {
      setFavoriteShows((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== showId)
      );
    }
  };

  /**
   * Sorts favorite shows based on the specified order.
   * @param {string} order - The sorting order ("asc" or "desc").
   * @function
   */
  const sortFavoriteShows = (order) => {
    const sortedFavorites = [...favoriteShows];
    sortedFavorites.sort((a, b) => {
      const showA = previews.find((show) => show.id === a.id);
      const showB = previews.find((show) => show.id === b.id);

      if (order === "asc") {
        return showA.title.localeCompare(showB.title);
      } else if (order === "desc") {
        return showB.title.localeCompare(showA.title);
      }

      return 0;
    });

    setFavoriteShows(sortedFavorites);
  };

  /**
   * Sorts shows based on the specified order and attribute.
   * @param {string} order - The sorting order ("asc" or "desc").
   * @param {string} sortBy - The attribute to sort by ("title" or "date").
   * @function
   */
  const sortShows = (order, sortBy) => {
    const sortedPreviews = [...previews];
    sortedPreviews.sort((a, b) => {
      if (sortBy === "title") {
        if (order === "asc") {
          return a.title.localeCompare(b.title);
        } else if (order === "desc") {
          return b.title.localeCompare(a.title);
        }
      } else if (sortBy === "date") {
        const dateA = new Date(a.updated);
        const dateB = new Date(b.updated);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
    setPreviews(sortedPreviews);
  };

  /** Filters previews based on the specified filter text */
  const filteredPreviews = previews.filter((show) =>
    show.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="show-list-container">
      <h1 className="show-list-title">Show List</h1>
      <input
        type="text"
        placeholder="Filter by title..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <div className="sort-buttons">
        <button className="sort-button" onClick={() => sortShows("asc", "title")}>A-Z</button>
        <button className="sort-button" onClick={() => sortShows("desc", "title")}>Z-A</button>
        <button className="sort-button" onClick={() => sortShows("asc", "date")}>Oldest First</button>
        <button className="sort-button" onClick={() => sortShows("desc", "date")}>Newest First</button>
      </div>
      <div className="show-grid">
        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : (
          filteredPreviews.map((show, index) => (
            <div
              key={show.id}
              className="show-card"
              onClick={() => fetchShowDetails(show.id)}
            >
              <div className="show-card-header">
                <p className="show-title">{show.title}</p>
                <p className="show-date">
                  Updated: {formatDate(show.updated)}
                </p>
              </div>
              <img className="show-image" src={show.image} alt={show.title} />
              <div className="show-actions">
                <button onClick={() => toggleFavorite(show.id)}>
                  {show.isFavorite ? "Remove Favorite" : "Add Favorite"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="favorite-list">
        <h2>Favorite Shows</h2>
        <div className="sort-buttons">
          <button className="sort-button" onClick={() => sortFavoriteShows("asc")}>A-Z</button>
          <button className="sort-button" onClick={() => sortFavoriteShows("desc")}>Z-A</button>
        </div>
        <ul>
          {favoriteShows.map((favorite) => {
            const show = previews.find((show) => show.id === favorite.id);
            return (
              <li key={show.id}>
                {show.title} - Added: {favorite.timestamp.toLocaleString()}
              </li>
            );
          })}
        </ul>
      </div>
      {selectedShow && <Show show={selectedShow} onClose={closeShowDetails} />}
    </div>
  );
};

export default ShowList;
