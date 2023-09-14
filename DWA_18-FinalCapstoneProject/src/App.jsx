/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { supabase } from './Components/Toggle/supabaseClient';
import LandingPage from './Components/Homepage/LandingPage';
import Home from './Components/Homepage/Home';
import BrowseAllCards from './Components/Homepage/BrowseAllCards';
import Contact_Us from './Components/Homepage/ContactUs';
import About_Us from './Components/Homepage/About Us';
import Login from './Components/Login/Login'; // Import your Login component

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact-us" element={<Contact_Us />} />
        <Route path="/about-us" element={<About_Us />} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<App />);





