import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { ModalOverlay } from './modalOverlay';

import styles from './modal.module.css';

export const Modal = ({ heading = '', children, isOpen, onClose, containerId }) => {
  const [containerModal, setContainerModal] = useState(null);

  // Инициализируем контейнер при монтировании
  useEffect(() => {
    const modalRootContainer = document.getElementById(containerId);
    if (modalRootContainer) {
      setContainerModal(modalRootContainer);
    } else {
      setContainerModal(null);
      console.error(`Контейнер #${containerId} не найден!`);
    }
  }, []);

  const dialogRef = useRef(null);
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleClick = (e) => {
    // Проверяем, что клик был именно на dialog, а не внутри него
    if (
      e.target === dialogRef.current &&
      !e.target.closest('.modal-content') // исключаем клик внутри содержимого
    ) {
      onClose();
    }
  };
  // Если контейнер не найден или модальное окно закрыто, не рендерим портал
  if (!containerModal || !isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay isOpen={isOpen} handleClose={handleClose} />
      <dialog
        ref={dialogRef}
        className={`text text_type_main-default ${styles.dialog} p-10 pb-15`}
        onClose={handleClose}
        onClick={handleClick}
      >
        <h2 className={`text text_type_main-large ${styles.heading}`}>
          <span>{heading}</span>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </h2>
        {children}
      </dialog>
    </>,
    containerModal
  );
};
