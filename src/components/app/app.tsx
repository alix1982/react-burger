import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAppDispatch } from '@/store/hooksStore';
import { receivingIngridients } from '@/store/ingriedientsSlice/ingriedientsSlice';
import { receivingUser } from '@/store/userSlice/userSlice';

import { router } from './router';

export const App = (): React.ReactNode => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(receivingUser());
    dispatch(receivingIngridients());
  }, [dispatch]);

  localStorage.removeItem('isChangePassword');

  return (
    <RouterProvider router={router} />
    //   <AppHeader />
    // </RouterProvider>
  );
};
