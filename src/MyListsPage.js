// src/MyListsPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const MyListsPage = () => {
  const [movieLists, setMovieLists] = useState([]);
  const [listName, setListName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem("movieLists")) || [];
    setMovieLists(savedLists);
  }, []);

  const createList = () => {
    if (listName.trim()) {
      const newMovieLists = [...movieLists, { name: listName, movies: [] }];
      setMovieLists(newMovieLists);
      setListName("");
      localStorage.setItem("movieLists", JSON.stringify(newMovieLists));
    }
  };

  const removeList=(index)=>{
    const newMovieLists = [...movieLists];
    newMovieLists.splice(index, 1);
    setMovieLists(newMovieLists);
    localStorage.setItem("movieLists", JSON.stringify(newMovieLists));
  }

  const removeFromMovieList = (listIndex, movieIndex) => {
    const newMovieLists = [...movieLists];
    newMovieLists[listIndex].movies.splice(movieIndex, 1);
    setMovieLists(newMovieLists);
    localStorage.setItem("movieLists", JSON.stringify(newMovieLists));
  };

  const goBack = () => {
    navigate("/movies");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Movie-Lists</h1>
        <button className="btn-home" onClick={goBack}>Home</button>
      </header>

      <div className="movie-lists">
        <input
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="New list name"
        />
        <button className="btn-list" onClick={createList}>Create List</button>
        {movieLists.map((list, index) => (
          <div key={index} className="movie-list">
            <br></br>
            <h3>{list.name}</h3>
            <button
                    className="btn-remove"
                    onClick={() => removeList(index)}
                  >
                    -
                  </button>
            
            {list.movies.length > 0 ? (
              list.movies.map((movie, movieIndex) => (
                <div key={movieIndex} className="movie-item">
                  <p>{movieIndex + 1}) {movie.Title}</p>
                  <button
                    className="btn-remove"
                    onClick={() => removeFromMovieList(index, movieIndex)}
                  >
                    -
                  </button>
                </div>
              ))
            ) : (
              <p>No movies in this list</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListsPage;
