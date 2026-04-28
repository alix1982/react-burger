import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  // createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// import { ProfileOrder } from '@/components/profile-order/profile-order';
// import { ErrorPage } from '@/pages/error-page/error-page';
// import { FeedPage } from '@/pages/feed-page/feed-page';
// import { ForgotPasswordPage } from '@/pages/forgot-password-page/forgot-password-page';
// import { HomePage } from '@/pages/home-page/home-page';
// import { LoginPage } from '@/pages/login-page/login-page';
// import { ProfilePage } from '@/pages/profile-page/profile-page';
// import { RegisterPage } from '@/pages/register-page/register-page';
// import { ResetPasswordPage } from '@/pages/reset-password-page/reset-password-page';
import { receivingIngridients } from '@/store/ingriedientsSlice/ingriedientsSlice';
import { receivingUser } from '@/store/userSlice/userSlice';

import { AppHeader } from '../app-header/app-header';
import { router } from './router';

// import { ExitProfile } from '../exit-profile/exit-profile';
// import { FormProfile } from '../form-profile/form-profile';
// import { Modal } from '../modal/modal';
// import { ProtectedRoute } from '../protected-route/protected-route';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receivingUser());
    dispatch(receivingIngridients());
  }, [dispatch]);

  localStorage.removeItem('isChangePassword');

  return (
    // <div>
    //   <AppHeader />
    //   <RouterProvider router={router} />
    // </div>
    <RouterProvider router={router}>
      <AppHeader />
    </RouterProvider>
  );
};
