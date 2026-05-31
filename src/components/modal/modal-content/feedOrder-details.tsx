import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Price } from '@/share/price';
import { useAppSelector } from '@/store/hooksStore';
import { Singriedients, SisLoading } from '@/store/ingriedientsSlice/ingriedientsSlice';
import { Smessages } from '@/store/socketSlice/socketSlice';
import { ORDER_DEFAULT } from '@/utils/constant';
import { formatDateToUI } from '@/utils/helpers';

import type { Ingriedient, OrderSocket } from '@/store/types';

import styles from './feedOrder-details.module.css';

export const FeedOrderDetails = (): React.ReactNode => {
  const path = window.location.pathname.split('/')[1];
  const { id } = useParams();
  const messages = useAppSelector(Smessages);
  const ingriedients = useAppSelector(Singriedients);
  const isLoading = useAppSelector(SisLoading);
  const [mesCard, setMesCard] = useState<OrderSocket | undefined>();
  const [ingrArr, setIngrArr] = useState<Ingriedient[]>([]);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    let count = 0;
    ingrArr.forEach((item) => {
      count = count + item.price;
    });
    setFinalPrice(count);
  }, [ingrArr]);

  useEffect(() => {
    messages[messages.length - 1]?.orders &&
      setMesCard(messages[messages.length - 1].orders.find((item) => item._id === id));
    const newIngrArr: Ingriedient[] | null = [];
    let newIngr = null;
    if (mesCard?.ingredients) {
      mesCard.ingredients.forEach((ingr) => {
        newIngr = ingriedients.find((item) => item._id === ingr);
        newIngr && newIngrArr.push(newIngr);
        newIngr = null;
      });
      const arr = newIngrArr.splice(0, newIngrArr.length - 1);
      setIngrArr(arr);
    }
  }, [mesCard, ingriedients]);

  if (!mesCard) {
    setMesCard(ORDER_DEFAULT);
  }

  // console.log(messages);
  // console.log(mesCard);
  // console.log(ingrArr);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <article className={`${styles.modalFeedOrder}`}>
      <p
        className={`${path === 'profile' && styles.title} text text_type_digits-default mb-5`}
      >{`#${mesCard?.number}`}</p>
      <p className={`text text_type_main-medium mb-1`}>{mesCard?.name}</p>
      <p
        className={`${mesCard?.status === 'done' && styles.orderStatusDone} text text_type_main-small mb-5`}
      >
        {mesCard?.status === 'done' ? 'Выполнен' : 'В работе'}
      </p>
      <p className={`text text_type_main-medium`}>Состав:</p>
      <ul className={`custom-scroll ${styles.modalFeedOrderList}`}>
        {ingrArr.map((item) => (
          <li key={item._id} className={`${styles.modalFeedOrderPointIngriedient}`}>
            <div className={`${styles.ingriedientContent}`}>
              <img
                className={styles.iconIngriedients}
                src={item?.image_mobile}
                alt="ингридиент"
              />
              <p>{item.name}</p>
            </div>
            <Price
              price={`${item.type === 'bun' || item.type === 'bunDefault' ? '2' : '1'} x ${item.price}`}
              className={`text text_type_digits-default`}
              typeIcon={'primary'}
            />
          </li>
        ))}
      </ul>
      <div className={`${styles.modalFeedOrderFooter} mt-5`}>
        <p className={`${styles.title} text text_type_main-default text_color_inactive`}>
          {mesCard?.createdAt ? formatDateToUI(mesCard?.createdAt) : 'не определенно'}
        </p>
        <Price
          price={finalPrice}
          className={`text text_type_digits-default`}
          typeIcon={'primary'}
        />
      </div>
    </article>
  );
};
