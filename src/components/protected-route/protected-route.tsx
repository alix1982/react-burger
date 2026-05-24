import { Navigate, useLocation } from 'react-router-dom';

import { SisAuthChecked } from '@/store/authSlice/authSlice';
import { useAppSelector } from '@/store/hooksStore';
import { Suser } from '@/store/userSlice/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component,
}: ProtectedRouteProps): React.ReactNode => {
  const isAuthChecked = useAppSelector(SisAuthChecked);
  const user = useAppSelector(Suser);
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
