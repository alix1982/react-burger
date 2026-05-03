import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import { Modal } from '@/components/modal/modal';
// import { OrderDetails } from '@/components/modal/modal-content/order-details';
import { Price } from '@/share/price';
import {
  setIngriedientsUser,
  SingriedientsUser,
} from '@/store/constructorSlice/constructorSlice';
// import { setOrderModal } from '@/store/modalSlice/modalSlice';
import {
  sendingOrder,
  SerrorMes,
  SisLoading,
  // Sorder,
} from '@/store/orderSlice/orderSlice';
import { Suser } from '@/store/userSlice/userSlice';
import { BUN_DEFAULT } from '@/utils/constant';

import styles from './burger-constructor-price.module.css';

export const BurgerConstructorFinalPrice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ingriedientsUser = useSelector(SingriedientsUser);
  // const orderModalOn = useSelector(SorderModal);
  // const order = useSelector(Sorder);
  const isLoading = useSelector(SisLoading);
  const errorMes = useSelector(SerrorMes);
  const user = useSelector(Suser);
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    let count = 0;
    ingriedientsUser.forEach((item) => {
      count = count + item.price;
    });
    setFinalPrice(count);
  }, [ingriedientsUser]);

  const handleOrder = () => {
    if (user) {
      dispatch(sendingOrder(ingriedientsUser))
        .then((res) => {
          if (!res.error) {
            // dispatch(setOrderModal(true));
            dispatch(setIngriedientsUser(BUN_DEFAULT));
            navigate('/order');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate('/login');
    }
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
        disabled={ingriedientsUser[0]?.type === 'bunDefault' || isLoading}
      >
        {isLoading ? 'Оформляем заказ ...' : 'Оформить заказ'}
      </Button>
      {errorMes !== '' && <span className={styles.error}>{errorMes}</span>}
      {/* <Modal
        isOpen={orderModalOn}
        onClose={() => dispatch(setOrderModal(false))}
        containerId={'burgerConstructorFinalPrice'}
      >
        <OrderDetails numberOrder={order?.number} />
      </Modal> */}
    </article>
  );
};
