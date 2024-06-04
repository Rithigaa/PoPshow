// src/MoviePage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const MoviePage = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [movieLists, setMovieLists] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState({});

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem("movieLists")) || [];
    setMovieLists(savedLists);
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const addToMovieList = (movie, listIndex) => {
    const newMovieLists = [...movieLists];
    newMovieLists[listIndex].movies.push(movie);
    setMovieLists(newMovieLists);
    localStorage.setItem("movieLists", JSON.stringify(newMovieLists));
  };

  const toggleDropdown = (movieId) => {
    setDropdownVisible((prev) => ({
      ...prev,
      [movieId]: !prev[movieId],
    }));
  };

  return (
    <div className="app">
      <button className="btnlogout" onClick={onLogout}>Logout</button>
      <Link to="/mylist" className="btnlist">My Lists</Link>
      <header className="header">
        <h1>PoPshow</h1>
        
      </header>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <MovieCard movie={movie} />
              <button
                className="add-button"
                onClick={() => toggleDropdown(movie.imdbID)}
              >
                +
              </button>
              {dropdownVisible[movie.imdbID] && (
                <div className="add-to-list">
                  <select
                    onChange={(e) => addToMovieList(movie, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select list
                    </option>
                    {movieLists.map((list, index) => (
                      <option key={index} value={index}>
                        {list.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default MoviePage;
