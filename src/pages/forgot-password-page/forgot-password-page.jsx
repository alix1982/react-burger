import { useSelector } from 'react-redux';

import { AdditionalTextForm } from '@/components/additional-text-form/additional-text-form';
import { Form } from '@/components/form/form';
import {
  SerrorForgotPassword,
  SisLoadingForgotPassword,
} from '@/store/authSlice/authSlice';
import { formForgotPasswordData } from '@/utils/config-form';

import styles from './forgot-password-page.module.css';

export const ForgotPasswordPage = () => {
  const isLoadingForgotPassword = useSelector(SisLoadingForgotPassword);
  const errorForgotPassword = useSelector(SerrorForgotPassword);

  return (
    <div className={`${styles.forgotPasswordPage}`}>
      <h1 className={`${styles.heading} text text_type_main-large mt-10 mb-5 pl-5`}>
        Восстановление пароля
      </h1>
      <section>
        <Form
          formConfigData={formForgotPasswordData}
          isLoading={isLoadingForgotPassword}
          errorMes={errorForgotPassword}
          navigateUrl={'/reset-password'}
        />
        <AdditionalTextForm text="Вспомнили пароль?" textLink="Войти" routLink="login" />
      </section>
    </div>
  );
};
