/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation, Route } from "react-router-dom";

const AuthRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;
