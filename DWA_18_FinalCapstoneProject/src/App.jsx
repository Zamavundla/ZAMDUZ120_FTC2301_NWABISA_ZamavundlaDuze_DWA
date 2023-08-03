/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// App.js
import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/Homepage/LandingPage';
import Home from './Components/Homepage/Home';
import BrowseAllCards from './Components/Homepage/BrowseAllCards';
import { useAuth } from './Components/Login/AuthProvider';
import Contact_Us from './Components/Homepage/ContactUs';
import About_Us from './Components/Homepage/About Us';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact-us" element={<Contact_Us />} />
        <Route path="/about-us" element={<About_Us />} />
        <Route path="/browse-all" element={<BrowseAllCards />} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<App />);
