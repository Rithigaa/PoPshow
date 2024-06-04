// src/Auth.js
import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onAuth }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add authentication logic here
    onAuth();
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {isSignUp && (
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <p onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
        </p>
      </form>
    </div>
  );
};

export default Auth;
