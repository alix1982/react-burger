import { createBrowserRouter } from 'react-router-dom';

import { ProfileOrder } from '@/components/profile-order/profile-order';
import { ErrorPage } from '@/pages/error-page/error-page';
import { FeedPage } from '@/pages/feed-page/feed-page';
import { ForgotPasswordPage } from '@/pages/forgot-password-page/forgot-password-page';
import { HomePage } from '@/pages/home-page/home-page';
import { LoginPage } from '@/pages/login-page/login-page';
import { ProfilePage } from '@/pages/profile-page/profile-page';
import { RegisterPage } from '@/pages/register-page/register-page';
import { ResetPasswordPage } from '@/pages/reset-password-page/reset-password-page';

import { ExitProfile } from '../exit-profile/exit-profile';
import { FormProfile } from '../form-profile/form-profile';
import { Layout } from '../layout/layout';
import { Modal } from '../modal/modal';
import { ProtectedRoute } from '../protected-route/protected-route';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/register',
        element: <ProtectedRoute onlyUnAuth component={<RegisterPage />} />,
      },
      {
        path: '/login',
        element: <ProtectedRoute onlyUnAuth component={<LoginPage />} />,
      },
      {
        path: '/forgot-password',
        element: <ProtectedRoute onlyUnAuth component={<ForgotPasswordPage />} />,
      },
      {
        path: '/reset-password',
        element: <ProtectedRoute onlyUnAuth component={<ResetPasswordPage />} />,
      },
      {
        path: '/',
        element: <HomePage />,
        children: [
          {
            path: 'ingredients/:id',
            element: <Modal typeModal={'ingriedient'} />,
          },
          {
            path: 'order',
            element: <Modal typeModal={'order'} />,
          },
        ],
      },
      {
        path: '/profile',
        element: <ProtectedRoute component={<ProfilePage />} />,
        children: [
          {
            path: '',
            element: <FormProfile />,
          },
          {
            path: 'orders',
            element: <ProfileOrder />,
          },
          {
            path: 'exit',
            element: <ExitProfile />,
          },
        ],
      },
      {
        path: '/feed',
        element: <FeedPage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

// export const tempRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage />,
//   },
//   {
//     path: '/login',
//     element: <LoginPage />,
//   },
// ]);
