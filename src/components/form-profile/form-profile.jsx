import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  changeUser,
  SerrorGetUser,
  SerrorPatchUser,
  SisLoadingGetUser,
  SisLoadingPatchUser,
  Suser,
} from '@/store/userSlice/userSlice';

import styles from './form-profile.module.css';

export const FormProfile = () => {
  const dispatch = useDispatch();
  const isLoadingGetUser = useSelector(SisLoadingGetUser);
  const isLoadingPatchUser = useSelector(SisLoadingPatchUser);
  const errorGetUser = useSelector(SerrorGetUser);
  const errorPatchUser = useSelector(SerrorPatchUser);
  const user = useSelector(Suser);
  // console.log(user);
  const [isViewButtons, setIsViewButtons] = useState(false); // показываем кнопки формы если values изменился

  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState(
    user || {
      name: '',
      email: '',
      password: '',
    }
  );
  const [validForm, setValidForm] = useState({
    name: true,
    email: true,
    password: true,
  });

  const checkValidForm = () => {
    // console.log('check');
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
  };

  const checkValidEmailForm = (isValid) => {
    setValidForm({ ...validForm, email: isValid });
  };
  const checkValidPasswordForm = (isValid) => {
    setValidForm({ ...validForm, password: isValid });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setValues(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log(isValid);
      dispatch(changeUser(values));
    } else {
      console.log(isValid);
    }
  };

  useEffect(() => {
    setIsViewButtons(false);
    for (let key in values) {
      if (values[key] !== user[key]) {
        setIsViewButtons(true);
      }
    }
  }, [values]);

  useEffect(() => {
    setValues(user);
  }, [user]);

  useEffect(checkValidForm, [
    values.name,
    values.email,
    values.password,
    validForm.name,
    validForm.email,
    validForm.password,
  ]);

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
            value={values.name}
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
            value={values.email}
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
            value={values.password}
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
