import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Price } from '@/share/price';
import {
  setIngriedientsUser,
  SingriedientsUser,
} from '@/store/constructorSlice/constructorSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooksStore';
import { sendingOrder, SerrorMes, SisLoading } from '@/store/orderSlice/orderSlice';
import { Suser } from '@/store/userSlice/userSlice';
import { BUN_DEFAULT } from '@/utils/constant';

import styles from './burger-constructor-price.module.css';

export const BurgerConstructorFinalPrice = (): React.ReactNode => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ingriedientsUser = useAppSelector(SingriedientsUser);
  const isLoading = useAppSelector(SisLoading);
  const errorMes = useAppSelector(SerrorMes);
  const user = useAppSelector(Suser);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    let count = 0;
    ingriedientsUser.forEach((item) => {
      count = count + item.price;
    });
    setFinalPrice(count);
  }, [ingriedientsUser]);

  const handleOrder = (): void => {
    if (user) {
      dispatch(sendingOrder(ingriedientsUser))
        .then((res) => {
          // if (!res.error) {
          if (res.payload) {
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
        htmlType="button"
        disabled={ingriedientsUser[0]?.type === 'bunDefault' || isLoading}
      >
        {isLoading ? 'Оформляем заказ ...' : 'Оформить заказ'}
      </Button>
      {errorMes !== '' && <span className={styles.error}>{errorMes}</span>}
    </article>
  );
};
