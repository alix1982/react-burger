import styles from './modalOverlay.module.css';

export const ModalOverlay = ({ isOpen }) => {
  return (
    <section
      className={`${isOpen ? styles.open : styles.close} ${styles.overlay}`}
    ></section>
  );
};
