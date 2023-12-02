// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./Components/Login&SignUp/Client";
import LandingPage from "./Components/Homepage/LandingPage";
import Home from "./Components/Homepage/Home";
import Contact_Us from "./Components/Homepage/Contac_Us";
import About_Us from "./Components/Homepage/About_Us";
import LoginPage from "./Components/Login&SignUp/Login";
import SignUpPage from "./Components/Login&SignUp/SignUp";
import  BrowseAllCards from "./Components/Homepage/BrowseAllCards"
export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <Router>
      <Routes>
        {session ? (
          <>
            <Route path="/" element={<LoginPage setSession={setSession} />} />
            <Route path="/SignUp" element={<SignUpPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contact-us" element={<Contact_Us />} />
            <Route path="/about-us" element={<About_Us />} />
            <Route path="/browse-all" element={<BrowseAllCards />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
