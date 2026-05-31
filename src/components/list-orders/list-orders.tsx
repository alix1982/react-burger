import { useEffect, useState } from 'react';

import { useAppSelector } from '@/store/hooksStore';
import { Smessages } from '@/store/socketSlice/socketSlice';

import { PointOrder } from './point-order/point-order';

import type { OrderSocket } from '@/store/types';

import styles from './list-orders.module.css';

export const ListOrders = (): React.ReactNode => {
  const messages = useAppSelector(Smessages);
  const [mes, setMes] = useState<OrderSocket[]>([]);

  useEffect(() => {
    if (messages[messages.length - 1]?.orders) {
      setMes(messages[messages.length - 1].orders);
    }
  }, [messages.length, messages]);

  // console.log(messages);
  // console.log(mes);
  return (
    <section className={`custom-scroll ${styles.listOrdersPage}`}>
      <ul className={`${styles.listOrders}`}>
        {mes.length > 0 &&
          mes.map((item, index) => <PointOrder key={index} order={item} />)}
      </ul>
    </section>
  );
};
