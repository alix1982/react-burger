import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AdditionalTextForm } from '@/components/additional-text-form/additional-text-form';
import { AppHeader } from '@/components/app-header/app-header';
// import { FormRegister } from '@/components/form-register/form-register';
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
    <div>
      <AppHeader />
      <main className={`${styles.resetPasswordPage}`}>
        <h1 className={`${styles.heading} text text_type_main-large mt-10 mb-5 pl-5`}>
          Восстановление пароля
        </h1>
        <section>
          {/* <FormRegister /> */}
          <Form
            formConfigData={formResetPasswordData}
            isLoading={isLoadingResetPassword}
            errorMes={errorResetPassword}
            navigateUrl={'/login'}
          />
          <AdditionalTextForm
            text="Вспомнили пароль?"
            textLink="Войти"
            routLink="login"
          />
        </section>
      </main>
    </div>
  );
};
