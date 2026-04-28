import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import styles from './error-page.module.css';

export const ErrorPage = ({ errCode = 403 }) => {
  if (errCode !== 400 || errCode !== 403 || errCode !== 500) {
    errCode = 403;
  }

  const errorData = {
    400: {
      statusCode: 400,
      text: `Depeche Code где то накосячил, но они исправятся.`,
      span: 'А пока вернемся обратно?',
    },
    403: {
      statusCode: 403,
      text: 'Неизвестные просторы вселенной,',
      span: 'может вернутся обратно?',
    },
    500: {
      statusCode: 500,
      text: 'Солнечная вспышка, часть сервисов не работает!',
      span: 'Вернемся обратно?',
    },
  };

  const navigate = useNavigate();

  const handleAction = () => navigate(-1);

  return (
    <div className={`${styles.content}`}>
      <p className={`text text_type_digits-large ${styles.heading}`}>
        {errorData[errCode]?.statusCode}
      </p>
      <p className={`text text_type_digits-medium ${styles.text}`}>
        {errorData[errCode]?.text}
        <span className={`text text_type_digits-medium ${styles.span}`}>
          {errorData[errCode]?.span}
        </span>
      </p>
      <Button htmlType="button" onClick={handleAction}>
        Назад
      </Button>
    </div>
  );
};
