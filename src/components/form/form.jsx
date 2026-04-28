import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearErrorMes } from '@/store/authSlice/authSlice';

import { FormPoint } from './form-point/form-point';

import styles from './form.module.css';

export const Form = ({
  formConfigData,
  isLoading = false,
  errorMes = '',
  navigateUrl = '',
  valuesData = {},
}) => {
  // console.log(valuesData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstValues = {};
  formConfigData.inputs.forEach((input) => {
    if (valuesData[input.name]) {
      firstValues[input.name] = valuesData[input.name];
    } else {
      firstValues[input.name] = '';
    }
  });
  const [values, setValues] = useState(firstValues);

  const firstValidForm = {};
  formConfigData.inputs.forEach((input) => (firstValidForm[input.name] = true));
  const [validForm, setValidForm] = useState(firstValidForm);

  const [isValid, setIsValid] = useState(false);
  const [isActionSubmit, setIsActionSubmit] = useState(false); // состояние события сабмита для перехода по урлу дальше
  const [isViewButtons, setIsViewButtons] = useState(formConfigData.isButton); // показываем кнопки формы если values изменился

  const checkValidForm = () => {
    setIsValid(true);
    for (let key in values) {
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
    for (let key in validForm) {
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
  };

  // const handleClick = () => {
  //   setValues(firstValues);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsActionSubmit(false);
      dispatch(
        formConfigData.buttonsForm
          .find((button) => button.htmlType === 'submit')
          .actionButton(values)
      ).then((res) => {
        if (res.payload) {
          setIsActionSubmit(true);
        }
      });
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
        dispatch(clearErrorMes());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMes]);

  useEffect(() => {
    if (!formConfigData.isButton) {
      setIsViewButtons(false);
      for (let key in values) {
        if (values[key] !== firstValues[key]) {
          setIsViewButtons(true);
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
