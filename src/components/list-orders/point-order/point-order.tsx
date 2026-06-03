import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Price } from '@/share/price';
import { useAppDispatch, useAppSelector } from '@/store/hooksStore';
import { Singriedients } from '@/store/ingriedientsSlice/ingriedientsSlice';
import { setModalData } from '@/store/modalSlice/modalSlice';
import { formatDateToUI } from '@/utils/helpers';

import type { Ingriedient, OrderSocket } from '@/store/types';

import styles from './point-order.module.css';

type PointOrderProps = {
  order: OrderSocket;
};

export const PointOrder = ({ order }: PointOrderProps): React.ReactNode => {
  const path = window.location.pathname.split('/')[1];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ingriedients = useAppSelector(Singriedients);
  const [ingrArr, setIngrArr] = useState<Ingriedient[]>([]);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    const newIngrArr: Ingriedient[] | null = [];
    let newIngr = null;
    if (order.ingredients) {
      order.ingredients.forEach((ingr) => {
        newIngr = ingriedients.find((item) => item._id === ingr);
        newIngr && newIngrArr.push(newIngr);
        newIngr = null;
      });

      // расчет цены бургера - TODO: вынести функцию в хелпер
      let count = 0;
      newIngrArr.forEach((item) => {
        count = count + item.price;
      });
      setFinalPrice(count);

      const arr = newIngrArr.splice(0, newIngrArr.length - 1).reverse();
      setIngrArr(arr);
    }
  }, [order, ingriedients]);

  const handleOnIngriedients = (): void => {
    dispatch(setModalData({ modalData: order }));
    path === 'profile'
      ? navigate(`/profile/orders/${order._id}`)
      : navigate(`/feed/${order._id}`);
  };
  // console.log(ingrArr);
  // console.log(order);
  return (
    <li className={styles.orderPoint} onClick={handleOnIngriedients}>
      <div className={styles.headerPointOrder}>
        <p className={`text text_type_digits-default`}>{`#${order?.number}`}</p>
        <p className={`text text_type_main-default text_color_inactive`}>
          {formatDateToUI(order?.createdAt)}
        </p>
      </div>
      <p className={`text text_type_main-medium`}>{order?.name}</p>
      {path === 'profile' && (
        <p
          className={`${order?.status === 'done' && styles.orderStatusDone} text text_type_main-small mb-5`}
        >
          {order?.status === 'done' ? 'Выполнен' : 'В работе'}
        </p>
      )}
      <div className={styles.headerPointOrder}>
        <ul className={styles.listOrdersIconIngriedients}>
          {ingrArr.map((item, index) => (
            <li key={index} className={styles.pointListOrdersIconIngriedients}>
              <img
                className={styles.iconIngriedients}
                src={item?.image_mobile}
                alt="иконка"
              />
            </li>
          ))}
        </ul>
        <Price
          price={finalPrice}
          className={`text text_type_digits-default`}
          typeIcon={'primary'}
        />
      </div>
    </li>
  );
};
