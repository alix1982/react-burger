import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { Modal } from '@/components/modal/modal';
import { OrderDetails } from '@/components/modal/modal-content/order-details';
import { Price } from '@/share/price';

import styles from './burger-constructor-price.module.css';

export const BurgerConstructorFinalPrice = ({ ingriedientsUser }) => {
  const [finalPrice, setFinalPrice] = useState(0);
  const [isModalOpenOrder, setIsModalOpenOrder] = useState(false);

  useEffect(() => {
    let count = 0;
    ingriedientsUser.forEach((item) => {
      count = count + item.price;
    });
    setFinalPrice(count);
  }, [ingriedientsUser]);

  const handleOrder = () => {
    setIsModalOpenOrder(true);
  };

  return (
    <article className={styles.finalPrice} id={'burgerConstructorFinalPrice'}>
      <Price
        price={finalPrice}
        className={`text text_type_digits-medium ${styles.price}`}
        typeIcon={'primary'}
      />
      <Button
        onClick={handleOrder}
        size="large"
        type="primary"
        disabled={ingriedientsUser[0].type === 'bunDefault'}
      >
        Оформить заказ
      </Button>
      <Modal
        isOpen={isModalOpenOrder}
        onClose={() => setIsModalOpenOrder(false)}
        containerId={'burgerConstructorFinalPrice'}
      >
        <OrderDetails numberOrder={'034536'} />
      </Modal>
    </article>
  );
};
