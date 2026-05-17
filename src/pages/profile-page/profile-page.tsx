import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { MenuProfile } from '@/components/menu-profile/menu-profile';
import { useAppDispatch, useAppSelector } from '@/store/hooksStore';
import { receivingUser, Suser } from '@/store/userSlice/userSlice';

import styles from './profile-page.module.css';

export const ProfilePage = (): React.ReactNode => {
  const user = useAppSelector(Suser);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(receivingUser());
    }
  }, []);
  return (
    <div className={`${styles.profilePage} pr-4 pl-4`}>
      <MenuProfile />
      <Outlet />
    </div>
  );
};
