import { Outlet } from 'react-router-dom';

import { AppHeader } from '../app-header/app-header';

export const Layout = () => (
  <div>
    <AppHeader />
    <main>
      <Outlet />
    </main>
  </div>
);
