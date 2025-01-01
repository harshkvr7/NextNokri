import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ element }) => {
  const token = Cookies.get('auth_token');

  console.log(token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;