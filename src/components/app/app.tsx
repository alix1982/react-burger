import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAppDispatch } from '@/store/hooksStore';
import { receivingIngridients } from '@/store/ingriedientsSlice/ingriedientsSlice';
import { connect } from '@/store/socketSlice/socketSlice';
import { receivingUser } from '@/store/userSlice/userSlice';

import { router } from './router';

export const App = (): React.ReactNode => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(receivingUser());
    dispatch(receivingIngridients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(connect());
  }, []);

  localStorage.removeItem('isChangePassword');

  return (
    <RouterProvider router={router} />
    //   <AppHeader />
    // </RouterProvider>
  );
};
