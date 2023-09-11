/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactDOM } from 'react-dom/client';
import { createRoot } from 'react-dom/client'
import { createClient } from '@supabase/supabase-js';
import { supabase } from './Components/Toggle/supabaseClient';
import Login from './Components/Login/Login';
import LandingPage from './Components/Homepage/LandingPage';
import Home from './Components/Homepage/Home';
import BrowseAllCards from './Components/Homepage/BrowseAllCards';
import Contact_Us from './Components/Homepage/ContactUs';
import About_Us from './Components/Homepage/About Us';


export default function App() {
  return (
    <Router>
      <Login />
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
