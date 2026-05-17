import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/store/hooksStore';
import { setIngridientModal } from '@/store/modalSlice/modalSlice';
import { BUN_DEFAULT } from '@/utils/constant';

import { IngredientDetails } from './modal-content/ingredient-details';
import { OrderDetails } from './modal-content/order-details';
import { ModalOverlay } from './modalOverlay';

import styles from './modal.module.css';

type ModalType = 'ingriedient' | 'order' | 'default';

type ModalProps = {
  typeModal: ModalType;
};

type ModalConfig = {
  heading: string;
  childrenModal: React.ReactNode;
  onClose: (e: React.SyntheticEvent<HTMLButtonElement | HTMLDialogElement>) => void;
};

export const Modal = ({ typeModal = 'default' }: ModalProps): React.ReactNode => {
  if (typeModal !== 'ingriedient' && typeModal !== 'order') {
    typeModal = 'default';
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClose = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    navigate('/');
  };
  const handleCloseModalIngridient = (
    e: React.SyntheticEvent<HTMLButtonElement | HTMLDialogElement>
  ): void => {
    handleClose(e);
    dispatch(
      setIngridientModal({
        // isModalIngridient: false,
        ingredient: BUN_DEFAULT[0],
      })
    );
    // onClose();
  };
  const handleCloseModalOrder = (
    e: React.SyntheticEvent<HTMLButtonElement | HTMLDialogElement>
  ): void => {
    handleClose(e);
    // dispatch(setOrderModal(false));
    // onClose();
  };
  const handleCloseModalDefault = (
    e: React.SyntheticEvent<HTMLButtonElement | HTMLDialogElement>
  ): void => {
    handleClose(e);
  };

  const modalData: Record<ModalType, ModalConfig> = {
    ingriedient: {
      heading: 'Детали ингредиента',
      childrenModal: <IngredientDetails />,
      onClose: handleCloseModalIngridient,
    },
    order: {
      heading: '',
      childrenModal: <OrderDetails />,
      onClose: handleCloseModalOrder,
    },
    default: {
      heading: 'Неизвестное окно',
      childrenModal: <span>Закройте окно</span>,
      onClose: handleCloseModalDefault,
    },
  };

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [dialogRef]);

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>): void => {
    const target = e.target;
    // Проверяем, что клик был именно на dialog, а не внутри него
    if (target instanceof Element) {
      if (
        target === dialogRef.current &&
        !target.closest('.modal-content') // исключаем клик внутри содержимого
      ) {
        modalData[typeModal]?.onClose(e as React.SyntheticEvent<HTMLDialogElement>);
      }
    } else {
      console.warn('Click target is not an Element', target);
    }
  };

  // Очистка при размонтировании
  useEffect(() => {
    return (): void => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    };
  }, []);

  return (
    <>
      <ModalOverlay>
        <dialog
          ref={dialogRef}
          className={`text text_type_main-default ${styles.dialog} p-10 pb-15`}
          onClose={modalData[typeModal]?.onClose}
          onClick={handleClick}
        >
          <h2 className={`text text_type_main-large ${styles.heading}`}>
            <span>{modalData[typeModal]?.heading}</span>
            <button
              className={styles.closeButton}
              onClick={modalData[typeModal]?.onClose}
            >
              <CloseIcon type="primary" />
            </button>
          </h2>
          {modalData[typeModal]?.childrenModal}
        </dialog>
      </ModalOverlay>
    </>
  );
};
