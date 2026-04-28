import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@/components/app-header/app-header';
import { MenuProfile } from '@/components/menu-profile/menu-profile';
import { receivingUser } from '@/store/userSlice/userSlice';

import styles from './profile-page.module.css';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(receivingUser());
  }, []);
  return (
    <div>
      <AppHeader />
      <main className={`${styles.profilePage} pr-4 pl-4`}>
        <MenuProfile />
        <Outlet />
      </main>
    </div>
  );
};
