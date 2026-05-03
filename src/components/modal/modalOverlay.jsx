import styles from './modalOverlay.module.css';

export const ModalOverlay = ({ children }) => {
  return <section className={`${styles.overlay}`}>{children}</section>;
};
