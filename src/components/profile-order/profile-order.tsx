import { Outlet } from 'react-router-dom';

import { ListOrders } from '../list-orders/list-orders';

export const ProfileOrder = (): React.ReactNode => {
  return (
    <>
      <ListOrders />
      <Outlet />
    </>
  );
};
