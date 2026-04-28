import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { SisAuthChecked } from '@/store/authSlice/authSlice';
import { Suser } from '@/store/userSlice/userSlice';

export const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector(SisAuthChecked);
  const user = useSelector(Suser);
  // console.log(user);
  // console.log(isAuthChecked);
  // console.log(onlyUnAuth);
  const location = useLocation();
  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return component;
};
