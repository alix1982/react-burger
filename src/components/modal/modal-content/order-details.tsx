import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import iconSuccessfully from '@/assets/modalSuccessfully.svg';
import { useAppSelector } from '@/store/hooksStore';
import { Sorder } from '@/store/orderSlice/orderSlice';

import styles from './order-details.module.css';

export const OrderDetails = (): React.ReactNode => {
  const navigate = useNavigate();
  const order = useAppSelector(Sorder);

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
