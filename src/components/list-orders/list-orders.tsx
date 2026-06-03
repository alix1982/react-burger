import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooksStore';
import {
  connect,
  disconnect,
  SisLoading,
  Smessages,
} from '@/store/socketSlice/socketSlice';
import { SOCKET_URL_AUTH, SOCKET_URL_NO_AUTH } from '@/utils/constant';
import { getCookie } from '@/utils/helpers';

import { PointOrder } from './point-order/point-order';

import type { OrderSocket } from '@/store/types';

import styles from './list-orders.module.css';

export const ListOrders = (): React.ReactNode => {
  const token = getCookie('accessToken')?.split(' ')[1];
  const path = window.location.pathname.split('/')[1];
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(SisLoading);
  const messages = useAppSelector(Smessages);
  const [mes, setMes] = useState<OrderSocket[]>([]);

  useEffect(() => {
    console.log(path);
    const urlSocket =
      path === 'profile' && token
        ? `${SOCKET_URL_AUTH}?token=${token}`
        : SOCKET_URL_NO_AUTH;
    console.log(urlSocket);
    dispatch(connect({ urlSocket }));
    return (): void => {
      dispatch(disconnect());
    };
  }, []);

  useEffect(() => {
    const orders = messages[messages.length - 1]?.orders;

    // console.log(messages[messages.length - 1]?.orders);
    // console.log(Array.isArray(messages[messages.length - 1]?.orders));
    if (orders) {
      if (path === 'profile') {
        const ordersProfile = [...orders];
        setMes(ordersProfile);
      } else {
        const ordersFeed = [...orders].reverse();
        setMes(ordersFeed);
      }
    }
  }, [messages.length, messages]);

  if (isLoading) {
    return <Preloader />;
  }
  // console.log(messages);
  // console.log(mes);
  return (
    <section className={`custom-scroll ${styles.listOrdersPage}`}>
      <ul className={`${styles.listOrders}`}>
        {mes.length > 0 ? (
          mes.map((item, index) => <PointOrder key={index} order={item} />)
        ) : (
          <p className={`text text_type_main-default`}>Заказов не найдено</p>
        )}
      </ul>
    </section>
  );
};
