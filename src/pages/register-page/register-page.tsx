import { AdditionalTextForm } from '@/components/additional-text-form/additional-text-form';
import { Form } from '@/components/form/form';
import { SerrorRegister, SisLoadingRegister } from '@/store/authSlice/authSlice';
import { useAppSelector } from '@/store/hooksStore';
import { formRegisterData } from '@/utils/config-form';

import styles from './register-page.module.css';

export const RegisterPage = (): React.ReactNode => {
  const isLoadingRegister = useAppSelector(SisLoadingRegister);
  const errorRegister = useAppSelector(SerrorRegister);
  return (
    <div className={`${styles.registerPage}`}>
      <h1 className={`${styles.heading} text text_type_main-large mt-10 mb-5 pl-5`}>
        Регистрация
      </h1>
      <section>
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
    </div>
  );
};
