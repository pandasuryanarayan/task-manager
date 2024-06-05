import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
