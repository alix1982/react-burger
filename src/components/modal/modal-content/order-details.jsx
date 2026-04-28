import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import iconSuccessfully from '@/assets/modalSuccessfully.svg';
import { Sorder } from '@/store/orderSlice/orderSlice';

import styles from './order-details.module.css';

export const OrderDetails = () => {
  const navigate = useNavigate();
  const order = useSelector(Sorder);

  useEffect(() => {
    if (!order?.number) {
      navigate('/');
    }
  }, []);

  return (
    <article className={`${styles.modal_order}`}>
      <p className={`text text_type_digits-large pt-15 pb-8`}>{order?.number}</p>
      <p className={`text text_type_main-medium pb-15`}>идентификатор заказа</p>
      <img className={`pb-15`} src={iconSuccessfully} />
      <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive pb-15`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </article>
  );
};
