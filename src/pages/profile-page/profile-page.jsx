import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { MenuProfile } from '@/components/menu-profile/menu-profile';
import { receivingUser, Suser } from '@/store/userSlice/userSlice';

import styles from './profile-page.module.css';

export const ProfilePage = () => {
  const user = useSelector(Suser);

  const dispatch = useDispatch();
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
