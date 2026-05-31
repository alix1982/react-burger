import type { OrderSocket } from '@/store/types';

import styles from './list-processing-orders.module.css';

type ListProcessingOrdersProps = {
  status: 'done' | 'pending';
  listOrder: OrderSocket[];
};

export const ListProcessingOrders = ({
  status,
  listOrder,
}: ListProcessingOrdersProps): React.ReactNode => {
  return (
    <div className={styles.orders}>
      <h2 className={`${styles.headingOrder} text text_type_main-medium mb-3`}>
        {status === 'done' ? 'Готовы' : 'В работе'}
      </h2>
      <ul className={styles.listOrders}>
        {listOrder.map((item) => (
          <li
            key={item._id}
            className={`${status === 'done' ? styles.pointOrderDone : styles.pointOrderPending} text text_type_digits-default`}
          >
            {item.number}
          </li>
        ))}
      </ul>
    </div>
  );
};
