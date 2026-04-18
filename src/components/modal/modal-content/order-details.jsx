import iconSuccessfully from '@/assets/modalSuccessfully.svg';

import styles from './order-details.module.css';

export const OrderDetails = ({ numberOrder }) => {
  return (
    <article className={`${styles.modal_order}`}>
      <p className={`text text_type_digits-large pt-15 pb-8`}>{numberOrder}</p>
      <p className={`text text_type_main-medium pb-15`}>идентификатор заказа</p>
      <img className={`pb-15`} src={iconSuccessfully} />
      <p className={`text text_type_main-default`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-default text_color_inactive pb-15`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </article>
  );
};
