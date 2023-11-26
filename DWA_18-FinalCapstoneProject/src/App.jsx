/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { supabase } from './Components/Toggle/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from "@supabase/auth-ui-shared";
import LandingPage from './Components/Homepage/LandingPage';
import Home from './Components/Homepage/Home';
import BrowseAllCards from './Components/Homepage/BrowseAllCards';
import Contact_Us from './Components/Homepage/ContactUs';
import About_Us from './Components/Homepage/About Us';

export default function App() {
  const [session, setSession] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: session }) => {
      setSession(session);
    });
    
    const subscription = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    setSubscription(subscription);

    return () => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);

  if (!session) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google", "facebook", "github"]}
          />
        </div>
      </div>
    );
  } else {
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
}
