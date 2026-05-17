import styles from './modalOverlay.module.css';

type ModalOverlayProps = {
  children: React.ReactNode;
};

export const ModalOverlay = ({ children }: ModalOverlayProps): React.ReactNode => {
  return <section className={`${styles.overlay}`}>{children}</section>;
};
