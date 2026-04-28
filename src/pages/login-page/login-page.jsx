import { useSelector } from 'react-redux';

import { AdditionalTextForm } from '@/components/additional-text-form/additional-text-form';
import { AppHeader } from '@/components/app-header/app-header';
// import { FormLogin } from '@/components/form-login/form-login';
import { Form } from '@/components/form/form';
import { SerrorLogin, SisLoadingLogin } from '@/store/authSlice/authSlice';
import { formLoginData } from '@/utils/config-form';

import styles from './login-page.module.css';

export const LoginPage = () => {
  const isLoadingLogin = useSelector(SisLoadingLogin);
  const errorLogin = useSelector(SerrorLogin);
  return (
    <div>
      <AppHeader />
      <main className={`${styles.loginPage}`}>
        <h1 className={`${styles.heading} text text_type_main-large mt-10 mb-5 pl-5`}>
          Вход
        </h1>
        <section>
          {/* <FormLogin /> */}
          <Form
            formConfigData={formLoginData}
            isLoading={isLoadingLogin}
            errorMes={errorLogin}
            navigateUrl={'/'}
          />
          <AdditionalTextForm
            text="Вы — новый пользователь?"
            textLink="Зарегистрироваться"
            routLink="register"
          />
          <AdditionalTextForm
            text="Забыли пароль?"
            textLink="Восстановить пароль"
            routLink="forgot-password"
            marginTop="mt-2"
          />
        </section>
      </main>
    </div>
  );
};
