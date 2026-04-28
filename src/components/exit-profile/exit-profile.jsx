import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  logout,
  SerrorLogout,
  SisLoadingLogout,
  StextLogout,
} from '@/store/authSlice/authSlice';

import styles from './exit-profile.module.css';

export const ExitProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const textLogout = useSelector(StextLogout);
  const isLoadingLogout = useSelector(SisLoadingLogout);
  const errorLogout = useSelector(SerrorLogout);

  useEffect(() => {
    dispatch(logout());
  }, []);

  useEffect(() => {
    if (textLogout) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [textLogout]);
  return (
    <article>
      {isLoadingLogout ? (
        <Preloader />
      ) : (
        // <p className={`${styles.devDefault} text text_type_main-medium`}>
        <p
          className={`${styles.exitProfile} ${errorLogout ? 'text text_type_main-medium text_color_error' : 'text text_type_main-medium'}`}
        >
          {errorLogout ? errorLogout : textLogout}
        </p>
      )}
    </article>
  );
};
