import { useSelector } from 'react-redux';

import { AdditionalTextForm } from '@/components/additional-text-form/additional-text-form';
import { AppHeader } from '@/components/app-header/app-header';
// import { FormRegister } from '@/components/form-register/form-register';
import { Form } from '@/components/form/form';
import { SerrorRegister, SisLoadingRegister } from '@/store/authSlice/authSlice';
import { formRegisterData } from '@/utils/config-form';

import styles from './register-page.module.css';

export const RegisterPage = () => {
  const isLoadingRegister = useSelector(SisLoadingRegister);
  const errorRegister = useSelector(SerrorRegister);
  return (
    <div>
      <AppHeader />
      <main className={`${styles.registerPage}`}>
        <h1 className={`${styles.heading} text text_type_main-large mt-10 mb-5 pl-5`}>
          Регистрация
        </h1>
        <section>
          {/* <FormRegister /> */}
          <Form
            formConfigData={formRegisterData}
            isLoading={isLoadingRegister}
            errorMes={errorRegister}
            navigateUrl={'/'}
          />
          <AdditionalTextForm
            text="Уже зарегистрированы?"
            textLink="Войти"
            routLink="login"
          />
        </section>
      </main>
    </div>
  );
};
