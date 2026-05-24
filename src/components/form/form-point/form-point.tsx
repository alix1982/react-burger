import {
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';

import type { InputConfig } from '@/utils/types';

import type { FormValidForm, FormValues } from '../form';

import styles from './form-point.module.css';

type FormPointProps = {
  configPoint: InputConfig;
  values: FormValues;
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
  validForm: FormValidForm;
  setValidForm: React.Dispatch<React.SetStateAction<FormValidForm>>;
};

export const FormPoint = ({
  configPoint,
  values,
  setValues,
  validForm,
  setValidForm,
}: FormPointProps): React.ReactNode => {
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
  return (
    <li className={`${styles.formPoint}`}>
      {configPoint.name === 'email' ? (
        <EmailInput
          checkValid={(isValid) => {
            checkValidEmailForm(isValid);
          }}
          isIcon={configPoint.icon ? true : false}
          autoComplete={configPoint.autoComplete}
          name={configPoint.name}
          onChange={handleChange}
          placeholder={configPoint.placeholder}
          value={values[configPoint.name] ?? ''}
        />
      ) : configPoint.name === 'password' ? (
        <PasswordInput
          checkValid={(isValid) => {
            checkValidPasswordForm(isValid);
          }}
          icon={configPoint.icon}
          autoComplete={configPoint.autoComplete}
          name={configPoint.name}
          onChange={handleChange}
          value={values[configPoint.name] ?? ''}
        />
      ) : (
        <Input
          // checkValid={(isValid) => {
          //   checkValidNameForm(isValid);
          // }}
          // extraClass={`${styles.inputText}`}
          // ref={{
          //   current: '[Circular]',
          // }}
          // onIconClick={function fee(){}}
          errorText="Ошибка"
          icon={configPoint.icon}
          autoComplete={configPoint.autoComplete}
          name={configPoint.name}
          onChange={handleChange}
          placeholder={configPoint.placeholder}
          size="default"
          type="text"
          value={values[configPoint.name] ?? ''}
        />
      )}
    </li>
  );
};
