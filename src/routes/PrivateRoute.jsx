import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate } from 'react-router-dom';
import Loader from '../Pages/Loader';

const PrivateRoute = ({ children }) => {
  const { user,loading } = useContext(AuthContext);
if(loading){
    return <Loader></Loader>
}

  if (user && user.email) {
    return children;
  }

  return <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
