import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@/components/app-header/app-header';
import { MenuProfile } from '@/components/menu-profile/menu-profile';
// import { SisAuthChecked } from '@/store/authSlice/authSlice';
import { receivingUser, Suser } from '@/store/userSlice/userSlice';

import styles from './profile-page.module.css';

export const ProfilePage = () => {
  // const userAuth = useSelector(SuserAuth);
  const user = useSelector(Suser);
  // const isAuthChecked = useSelector(SisAuthChecked);
  // console.log(userAuth);
  // console.log(user);
  // console.log(isAuthChecked);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(receivingUser());
    }
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
