// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import MoviePage from "./MoviePage";
import Auth from "./auth";
import MyListsPage from "./MyListsPage";
import './App.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/movies" /> : <Auth onAuth={handleAuth} />} />
        <Route path="/movies" element={isAuthenticated ? <MoviePage onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/mylist" element={isAuthenticated ? <MyListsPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
