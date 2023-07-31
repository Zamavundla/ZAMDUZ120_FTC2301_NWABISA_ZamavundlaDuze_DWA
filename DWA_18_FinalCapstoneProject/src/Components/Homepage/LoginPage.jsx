/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import supabase from '../Toggle/Supabase';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null); // State to hold the error message
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous error message
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) {
        setError(error.message); // Set the error message if login fails
      } else {
        console.log('Login successful:', user);
        history.replace('/LandingPage');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('An error occurred. Please try again later.'); // Set a generic error message for unexpected errors
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display the error message, if any */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
