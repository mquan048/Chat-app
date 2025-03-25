import React from 'react';
import { useAuth } from '../hooks';
import { Navigate } from 'react-router';
import Login from '../pages/Login';
import Register from '../pages/Register';

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useAuth();

  if (children.type === Login || children.type === Register) {
    return isLogged ? <Navigate to="/" /> : children;
  } else {
    return isLogged ? children : <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
