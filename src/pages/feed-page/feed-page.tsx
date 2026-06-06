import { Outlet } from 'react-router-dom';

import { ListOrders } from '@/components/list-orders/list-orders';
import { ProcessingOrders } from '@/components/processing-orders/processing-orders';

import styles from './feed-page.module.css';

export const FeedPage = (): React.ReactNode => {
  return (
    <div className={styles.feedPage}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Лента заказов
      </h1>
      <div className={styles.feedPageBlocks}>
        <ListOrders />
        <ProcessingOrders />
      </div>
      <Outlet />
    </div>
  );
};
