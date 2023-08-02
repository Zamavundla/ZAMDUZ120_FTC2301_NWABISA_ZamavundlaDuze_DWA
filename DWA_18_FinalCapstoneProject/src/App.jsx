/* eslint-disable no-unused-vars */
import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Components/Login/AuthProvider';
import Home from './Components/Homepage/Home';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import Contact_Us from './Components/Homepage/ContactUs';
import About_Us from './Components/Homepage/About Us';
import LandingPage from './Components/Homepage/LandingPage';
import AuthRoute from './Components/Login/AuthRoute'; // Import the AuthRoute component

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AuthRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
