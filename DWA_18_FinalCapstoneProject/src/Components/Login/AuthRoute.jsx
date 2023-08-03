/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import { useAuth } from '../Login/AuthProvider';

const AuthRoute = ({ children, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login', // Redirect to the login page if the user is not authenticated
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

// Add prop types validation
AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
