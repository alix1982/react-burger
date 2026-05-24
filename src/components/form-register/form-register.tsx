import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import {
  register,
  SerrorRegister,
  SisLoadingRegister,
} from '@/store/authSlice/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooksStore';

import styles from './form-register.module.css';

type FormRegisterValues = {
  name: string;
  email: string;
  password: string;
};
type FormRegisterValidForm = {
  name: boolean;
  email: boolean;
  password: boolean;
};
export const FormRegister = (): React.ReactNode => {
  const dispatch = useAppDispatch();
  const isLoadingRegister = useAppSelector(SisLoadingRegister);
  const errorRegister = useAppSelector(SerrorRegister);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [values, setValues] = useState<FormRegisterValues>({
    name: '',
    email: '',
    password: '',
  });
  const [validForm, setValidForm] = useState<FormRegisterValidForm>({
    name: true,
    email: true,
    password: true,
  });

  const checkValidForm = (): void => {
    if (
      validForm.name === true &&
      validForm.email === true &&
      validForm.password === true &&
      values.name !== '' &&
      values.email !== '' &&
      values.password !== ''
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  // const checkValidNameForm = (isValid) => {
  //   // console.log(isValid);
  //   setValidForm({ ...validForm, name: isValid });
  // };
  const checkValidEmailForm = (isValid: boolean): void => {
    setValidForm({ ...validForm, email: isValid });
  };
  const checkValidPasswordForm = (isValid: boolean): void => {
    setValidForm({ ...validForm, password: isValid });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isValid) {
      console.log(isValid);
      dispatch(register(values));
    } else {
      console.log(isValid);
    }
  };

  useEffect(checkValidForm);

  // console.log(values);
  // console.log(isValid);
  return (
    <form
      // autoComplete="off"
      className={`${styles.formRegister} text text_type_main-large mt-10 mb-5 pl-5`}
      onSubmit={handleSubmit}
    >
      <Input
        // checkValid={(isValid) => {
        //   checkValidNameForm(isValid);
        // }}
        // extraClass={`${styles.inputText}`}
        // ref={{
        //   current: '[Circular]',
        // }}
        errorText="Ошибка"
        // icon="EditIcon"
        name="name"
        onChange={(e) => {
          handleChange(e);
        }}
        // onIconClick={function fee(){}}
        placeholder="Имя"
        size="default"
        type="text"
        value={values.name}
      />
      <EmailInput
        checkValid={(isValid) => {
          checkValidEmailForm(isValid);
        }}
        // isIcon
        // autoComplete="off"
        name="email"
        onChange={handleChange}
        placeholder="E-mail"
        value={values.email}
      />
      <PasswordInput
        checkValid={(isValid) => {
          checkValidPasswordForm(isValid);
        }}
        icon="ShowIcon"
        autoComplete="new-password"
        name="password"
        onChange={handleChange}
        value={values.password}
      />
      <Button
        htmlType="submit"
        extraClass={styles.buttonSubmit}
        // onClick={function fee(){}}
        size="medium"
        type="primary"
        disabled={!isValid || isLoadingRegister}
      >
        {isLoadingRegister ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
      <span className={`text text_type_main-default text_color_error`}>
        {errorRegister ? errorRegister : ''}
      </span>
    </form>
  );
};
