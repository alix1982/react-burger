import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  changePassword,
  clearErrorMesAuth,
  login,
  register,
  resetPassword,
} from '@/store/authSlice/authSlice';
import { useAppDispatch } from '@/store/hooksStore';
import { changeUser } from '@/store/userSlice/userSlice';

import { FormPoint } from './form-point/form-point';

import type {
  FetchLoginArg,
  FetchPasswordChangeArg,
  FetchPasswordResetArg,
  FetchRegisterArg,
  FetchUserArg,
} from '@/store/types';
import type { FormData } from '@/utils/types';

import styles from './form.module.css';

type FormProps = {
  formConfigData: FormData;
  isLoading: boolean;
  errorMes: string;
  navigateUrl: string;
};
export type FormValues = {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
};
export type FormValidForm = {
  name?: boolean;
  email?: boolean;
  password?: boolean;
  token?: boolean;
};

export const Form = ({
  formConfigData,
  isLoading = false,
  errorMes = '',
  navigateUrl = '',
}: FormProps): React.ReactNode => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const firstValues: FormValues = {};
  const valuesData: FormValues = {};
  formConfigData.inputs.forEach((input) => {
    if (valuesData[input.name]) {
      firstValues[input.name] = valuesData[input.name];
    } else {
      firstValues[input.name] = '';
    }
  });
  const [values, setValues] = useState<FormValues>(firstValues);

  const firstValidForm: FormValidForm = {};
  formConfigData.inputs.forEach((input) => (firstValidForm[input.name] = true));
  const [validForm, setValidForm] = useState<FormValidForm>(firstValidForm);

  const [isValid, setIsValid] = useState<boolean>(false);
  const [isActionSubmit, setIsActionSubmit] = useState<boolean>(false); // состояние события сабмита для перехода по урлу дальше
  const [isViewButtons, setIsViewButtons] = useState<boolean>(formConfigData.isButton); // показываем кнопки формы если values изменился

  const checkValidForm = (): void => {
    setIsValid(true);
    for (const key in values) {
      if (key === 'name' || key === 'email' || key === 'password' || key === 'token') {
        if (formConfigData.nameForm !== 'profile') {
          if (values[key] === '') {
            setIsValid(false);
          }
        } else if (key !== 'password') {
          if (values[key] === '') {
            setIsValid(false);
          }
        }
      }
    }
    for (const key in validForm) {
      if (key === 'name' || key === 'email' || key === 'password' || key === 'token') {
        if (formConfigData.nameForm !== 'profile') {
          if (validForm[key] === false) {
            setIsValid(false);
          }
        } else if (key !== 'password') {
          if (validForm[key] === false) {
            setIsValid(false);
          }
        }
      }
    }
  };

  // const handleClick = () => {
  //   setValues(firstValues);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isValid) {
      // const submitButton = formConfigData.buttonsForm.find(
      //   (button: ButtonForm) => button.htmlType === 'submit'
      // );
      // if (!submitButton || !submitButton.actionButton) {
      //   return; // если кнопки или обработчика нет — выходим
      // }

      setIsActionSubmit(false);

      // dispatch(
      //   formConfigData.buttonsForm
      //     .find((button) => button.htmlType === 'submit')
      //     .actionButton(values)
      // ).then((res) => {
      //   if (res.payload) {
      //     setIsActionSubmit(true);
      //   }
      // });

      // TODO: гори в аду тайпскрипт
      const handleFormSubmit = async (): Promise<void> => {
        formConfigData.nameForm === 'login' &&
          (await dispatch(login(values as FetchLoginArg)).then((res) => {
            if (res?.payload) {
              setIsActionSubmit(true);
            }
          }));
        formConfigData.nameForm === 'register' &&
          (await dispatch(register(values as FetchRegisterArg)).then((res) => {
            if (res?.payload) {
              setIsActionSubmit(true);
            }
          }));
        formConfigData.nameForm === 'forgot-password' &&
          (await dispatch(changePassword(values as FetchPasswordChangeArg)).then(
            (res) => {
              if (res?.payload) {
                setIsActionSubmit(true);
              }
            }
          ));
        formConfigData.nameForm === 'reset-password' &&
          (await dispatch(resetPassword(values as FetchPasswordResetArg)).then((res) => {
            if (res?.payload) {
              setIsActionSubmit(true);
            }
          }));
        formConfigData.nameForm === 'profile' &&
          (await dispatch(changeUser(values as FetchUserArg)).then((res) => {
            if (res?.payload) {
              setIsActionSubmit(true);
            }
          }));
      };

      handleFormSubmit();
    } else {
      console.log(isValid);
    }
  };

  useEffect(() => {
    // console.log(isActionSubmit);
    if (navigateUrl !== '' && isActionSubmit) {
      navigate(navigateUrl);
    }
  }, [isActionSubmit]);

  useEffect(() => {
    if (errorMes) {
      const timer = setTimeout(() => {
        dispatch(clearErrorMesAuth());
      }, 3000);
      return (): void => clearTimeout(timer);
    }
  }, [errorMes]);

  useEffect(() => {
    if (!formConfigData.isButton) {
      setIsViewButtons(false);
      for (const key in values) {
        if (key === 'name' || key === 'email' || key === 'password' || key === 'token') {
          if (values[key] !== firstValues[key]) {
            setIsViewButtons(true);
          }
        }
      }
    }
  }, [values]);

  useEffect(checkValidForm);

  // console.log(isValid);
  // console.log(values);
  return (
    <form
      className={`${styles.form} text text_type_main-large mt-10 mb-5`}
      onSubmit={handleSubmit}
    >
      <ul className={`${styles.formList}`}>
        {formConfigData.inputs.map((input, index) => (
          <FormPoint
            key={index}
            configPoint={input}
            values={values}
            setValues={setValues}
            validForm={validForm}
            setValidForm={setValidForm}
          />
        ))}
      </ul>
      {isViewButtons && (
        <ul className={`${styles.formButtons}`}>
          {formConfigData.buttonsForm.map((button, index) => (
            <Button
              key={index}
              htmlType={button.htmlType}
              extraClass={styles.button}
              size="medium"
              type="primary"
              disabled={!isValid || isLoading}
              // onClick={button.htmlType !== 'submit' && handleClick}
            >
              {isLoading ? button.textLoad : button.text}
            </Button>
          ))}
        </ul>
      )}
      <span className={`text text_type_main-default text_color_error`}>
        {errorMes ? errorMes : ''}
      </span>
    </form>
  );
};
