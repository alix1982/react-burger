import styles from './dev_default.module.css';

export const DevDefault = (): React.ReactNode => {
  return (
    <p className={`${styles.devDefault} text text_type_main-medium`}>В разработке ...</p>
  );
};
