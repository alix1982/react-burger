import { useEffect, useState } from 'react';

import { useAppSelector } from '@/store/hooksStore';
import { Smessages } from '@/store/socketSlice/socketSlice';

import { ListProcessingOrders } from './list-processing-orders/list-processing-orders';
import { ResultOrders } from './result-orders/result-orders';

import type { OrderSocket } from '@/store/types';

import styles from './processing-orders.module.css';

export const ProcessingOrders = (): React.ReactNode => {
  const messages = useAppSelector(Smessages);

  const [orderDone, setOrderDone] = useState<OrderSocket[]>([]);
  const [orderPending, setOrderPending] = useState<OrderSocket[]>([]);

  useEffect(() => {
    const orders = messages[messages.length - 1]?.orders;
    if (orders) {
      const orderDone = orders
        .filter((item) => item.status === 'done')
        // .reverse()
        .splice(0, 20);
      const orderPending = orders
        .filter((item) => item.status === 'pending')
        // .reverse()
        .splice(0, 20);
      setOrderDone(orderDone);
      setOrderPending(orderPending);
    }
  }, [messages]);

  // console.log(messages);
  // console.log(orderDone);
  // console.log(orderPending);
  return (
    <section className={styles.processingOrders}>
      <div className={styles.statusOrders}>
        <ListProcessingOrders status="done" listOrder={orderDone} />
        <ListProcessingOrders status="pending" listOrder={orderPending} />
      </div>
      <ResultOrders period="all" />
      <ResultOrders period="today" />
    </section>
  );
};
