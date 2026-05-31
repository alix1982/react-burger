import { useAppSelector } from '@/store/hooksStore';
import { Smessages } from '@/store/socketSlice/socketSlice';

type ResultOrdersProps = {
  period: 'all' | 'today';
};

export const ResultOrders = ({ period }: ResultOrdersProps): React.ReactNode => {
  const messages = useAppSelector(Smessages);

  return (
    <>
      <p className={`text text_type_main-medium mt-6`}>
        {period === 'today' ? 'выполнено за сегодня' : 'выполнено за все время'}
      </p>
      <p className={`text text_type_digits-medium mt-3`}>
        {period === 'today'
          ? messages[messages.length - 1]?.totalToday
          : messages[messages.length - 1]?.total}
      </p>
    </>
  );
};
