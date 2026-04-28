import { Link } from 'react-router-dom';

import styles from './additional-text-form.module.css';

export const AdditionalTextForm = ({
  text = 'Войти',
  textLink = 'Уже зарегистрированы?',
  routLink = 'login',
  marginTop = 'mt-20',
}) => {
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
