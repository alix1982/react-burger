import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooksStore';
import {
  changeUser,
  clearErrorMesUser,
  SerrorGetUser,
  SerrorPatchUser,
  SisLoadingGetUser,
  SisLoadingPatchUser,
  Suser,
} from '@/store/userSlice/userSlice';

import styles from './form-profile.module.css';

type FormProfileValues = {
  name: string;
  email: string;
  password: string;
} | null;
type FormProfileValidForm = {
  name: boolean;
  email: boolean;
  password: boolean;
};

export const FormProfile = (): React.ReactNode => {
  const dispatch = useAppDispatch();
  const isLoadingGetUser = useAppSelector(SisLoadingGetUser);
  const isLoadingPatchUser = useAppSelector(SisLoadingPatchUser);
  const errorGetUser = useAppSelector(SerrorGetUser);
  const errorPatchUser = useAppSelector(SerrorPatchUser);
  const user = useAppSelector(Suser);
  // console.log(user);
  const [isViewButtons, setIsViewButtons] = useState<boolean>(false); // показываем кнопки формы если values изменился

  const [isValid, setIsValid] = useState<boolean>(false);
  const [values, setValues] = useState<FormProfileValues>(
    user || {
      name: '',
      email: '',
      password: '',
    }
  );
  const [validForm, setValidForm] = useState<FormProfileValidForm>({
    name: true,
    email: true,
    password: true,
  });

  const checkValidForm = (): void => {
    // console.log('check');
    if (values?.name && values?.email) {
      if (
        validForm.name === true &&
        validForm.email === true &&
        validForm.password === true &&
        values.name !== '' &&
        values.email !== ''
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  };

  const checkValidEmailForm = (isValid: boolean): void => {
    setValidForm({ ...validForm, email: isValid });
  };
  const checkValidPasswordForm = (isValid: boolean): void => {
    setValidForm({ ...validForm, password: isValid });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (values) {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const handleClick = (): void => {
    setValues(user);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isValid) {
      console.log(isValid);
      if (values) {
        dispatch(changeUser(values));
      }
    } else {
      console.log(isValid);
    }
  };

  useEffect(() => {
    setIsViewButtons(false);
    if (user) {
      for (const key in values) {
        if (key === 'name' || key === 'email' || key === 'password') {
          if (values[key] !== user[key]) {
            setIsViewButtons(true);
          }
        }
      }
    }
  }, [values]);

  useEffect(() => {
    setValues(user);
  }, [user]);

  useEffect(checkValidForm, [
    values?.name,
    values?.email,
    values?.password,
    validForm.name,
    validForm.email,
    validForm.password,
  ]);

  useEffect(() => {
    if (errorGetUser || errorPatchUser) {
      const timer = setTimeout(() => {
        dispatch(clearErrorMesUser());
      }, 2000);
      return (): void => clearTimeout(timer);
    }
  }, [errorGetUser, errorPatchUser]);
  // console.log(values);
  // console.log(validForm);
  return (
    <form
      className={`${styles.form} text text_type_main-large mt-10 mb-5`}
      onSubmit={handleSubmit}
    >
      <ul className={`${styles.formList}`}>
        <li className={`${styles.formPoint}`}>
          <Input
            errorText="Ошибка"
            // icon="EditIcon"
            name="name"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="Имя"
            size="default"
            type="text"
            value={values?.name ? values.name : ''}
          />
        </li>
        <li className={`${styles.formPoint}`}>
          <EmailInput
            checkValid={(isValid) => {
              checkValidEmailForm(isValid);
            }}
            // isIcon
            name="email"
            onChange={handleChange}
            placeholder="E-mail"
            value={values?.email ? values.email : ''}
          />
        </li>
        <li className={`${styles.formPoint}`}>
          <PasswordInput
            checkValid={(isValid) => {
              checkValidPasswordForm(isValid);
            }}
            icon="ShowIcon"
            autoComplete="new-password"
            name="password"
            onChange={handleChange}
            value={values?.password ? values.password : ''}
          />
        </li>
      </ul>
      {isViewButtons && (
        <ul className={`${styles.formButtons}`}>
          <li className={`${styles.formPoint}`}>
            <Button
              htmlType="submit"
              extraClass={styles.button}
              size="medium"
              type="primary"
              disabled={!isValid || isLoadingGetUser || isLoadingPatchUser}
            >
              {isLoadingGetUser || isLoadingPatchUser ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </li>
          <li className={`${styles.formPoint}`}>
            <Button
              htmlType="button"
              extraClass={styles.button}
              size="medium"
              type="primary"
              disabled={isLoadingGetUser || isLoadingPatchUser}
              onClick={handleClick}
            >
              {isLoadingGetUser || isLoadingPatchUser ? 'Сброс...' : 'Отмена'}
            </Button>
          </li>
        </ul>
      )}
      <span className={`text text_type_main-default text_color_error`}>
        {errorGetUser ? errorGetUser : ''}
        {errorPatchUser ? errorPatchUser : ''}
      </span>
    </form>
  );
};
