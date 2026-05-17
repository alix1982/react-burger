import { Link } from 'react-router-dom';

import styles from './additional-text-form.module.css';

type AdditionalTextFormProps = {
  text: string;
  textLink: string;
  routLink: string;
  marginTop?: string;
};

export const AdditionalTextForm = ({
  text = 'Войти',
  textLink = 'Уже зарегистрированы?',
  routLink = 'login',
  marginTop = 'mt-20',
}: AdditionalTextFormProps): React.ReactNode => {
  return (
    <article
      className={`${styles.textLink} text text_type_main-default text_color_inactive ${marginTop}`}
    >
      <span>{text}</span>
      <Link to={`/${routLink}`} className={styles.link}>
        {textLink}
      </Link>
    </article>
  );
};
