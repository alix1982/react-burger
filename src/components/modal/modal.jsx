import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  setIngridientModal,
  // setOrderModal
} from '@/store/modalSlice/modalSlice';
import { BUN_DEFAULT } from '@/utils/constant';

import { IngredientDetails } from './modal-content/ingredient-details';
import { OrderDetails } from './modal-content/order-details';
import { ModalOverlay } from './modalOverlay';

import styles from './modal.module.css';

export const Modal = ({ typeModal = 'default' }) => {
  if (typeModal !== 'ingriedient' && typeModal !== 'order') {
    typeModal = 'default';
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dialogRef = useRef(null);

  const handleCloseModalIngridient = (e) => {
    e.preventDefault();
    navigate('/');
    dispatch(
      setIngridientModal({
        // isModalIngridient: false,
        ingredient: BUN_DEFAULT[0],
      })
    );
    // onClose();
  };
  const handleCloseModalOrder = (e) => {
    e.preventDefault();
    navigate('/');
    // dispatch(setOrderModal(false));
    // onClose();
  };
  const handleCloseModalDefault = (e) => {
    e.preventDefault();
    console.log('click');
    navigate('/');
  };

  const modalData = {
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

  const handleClick = (e) => {
    // Проверяем, что клик был именно на dialog, а не внутри него
    if (
      e.target === dialogRef.current &&
      !e.target.closest('.modal-content') // исключаем клик внутри содержимого
    ) {
      modalData[typeModal]?.onClose(e);
    }
  };

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
