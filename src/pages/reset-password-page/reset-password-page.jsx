import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AdditionalTextForm } from '@/components/additional-text-form/additional-text-form';
import { Form } from '@/components/form/form';
import {
  SerrorResetPassword,
  SisLoadingResetPassword,
} from '@/store/authSlice/authSlice';
import { formResetPasswordData } from '@/utils/config-form';

import styles from './reset-password-page.module.css';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const isLoadingResetPassword = useSelector(SisLoadingResetPassword);
  const errorResetPassword = useSelector(SerrorResetPassword);

  useEffect(() => {
    if (!localStorage.getItem('isChangePassword')) {
      navigate('/forgot-password');
    }
  }, []);

  return (
    <div className={`${styles.resetPasswordPage}`}>
      <h1 className={`${styles.heading} text text_type_main-large mt-10 mb-5 pl-5`}>
        Восстановление пароля
      </h1>
      <section>
        <Form
          formConfigData={formResetPasswordData}
          isLoading={isLoadingResetPassword}
          errorMes={errorResetPassword}
          navigateUrl={'/login'}
        />
        <AdditionalTextForm text="Вспомнили пароль?" textLink="Войти" routLink="login" />
      </section>
    </div>
  );
};
