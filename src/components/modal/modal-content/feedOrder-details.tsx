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

type IngredientFull = {
  id: string;
  count: number;
};

type IngredientWithCount = Ingriedient & {
  count?: number;
};

export const FeedOrderDetails = (): React.ReactNode => {
  const path = window.location.pathname.split('/')[1];
  const { id } = useParams();
  const messages = useAppSelector(Smessages);
  const ingriedients = useAppSelector(Singriedients);
  const isLoading = useAppSelector(SisLoading);
  const [orderCard, setOrderCard] = useState<OrderSocket | undefined>();
  const [ingriedientsRender, setIngriedientsRender] = useState<IngredientWithCount[]>(
    []
  );
  const [finalPrice, setFinalPrice] = useState<number>(0);

  useEffect(() => {
    let count = 0;
    ingriedientsRender.forEach((item) => {
      if (item.count) {
        count = count + item.price * item.count;
      }
    });
    setFinalPrice(count);
  }, [ingriedientsRender]);

  useEffect(() => {
    messages[messages.length - 1]?.orders &&
      setOrderCard(messages[messages.length - 1].orders.find((item) => item._id === id));

    const ingriedientsOrderFinal: IngredientWithCount[] | null = [];
    let ingriedientOrderFinal: IngredientWithCount | undefined | null = null;

    if (orderCard?.ingredients) {
      const processedIds: string[] = [];
      const ingriedientsIdNoDuplicates: IngredientFull[] = orderCard.ingredients
        .map((ingriedient) => {
          // console.log(ingriedient);
          const duplicatesArray = orderCard.ingredients.filter(
            (item) => item === ingriedient
          );
          if (!processedIds.find((item) => item === ingriedient)) {
            processedIds.push(ingriedient);
            return {
              id: ingriedient,
              count: duplicatesArray.length,
            };
          }
        })
        .filter((item) => item !== undefined);

      ingriedientsIdNoDuplicates.forEach((ingr) => {
        ingriedientOrderFinal = ingriedients.find((item) => item._id === ingr.id);

        if (ingriedientOrderFinal) {
          ingriedientsOrderFinal.push({ ...ingriedientOrderFinal, count: ingr.count });
        }
        ingriedientOrderFinal = null;
      });

      // const arrFinish = [...newIngrArr];
      setIngriedientsRender(ingriedientsOrderFinal);
    }
  }, [orderCard, ingriedients]);

  if (!orderCard) {
    setOrderCard(ORDER_DEFAULT);
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
      >{`#${orderCard?.number}`}</p>
      <p className={`text text_type_main-medium mb-1`}>{orderCard?.name}</p>
      <p
        className={`${orderCard?.status === 'done' && styles.orderStatusDone} text text_type_main-small mb-5`}
      >
        {orderCard?.status === 'done' ? 'Выполнен' : 'В работе'}
      </p>
      <p className={`text text_type_main-medium`}>Состав:</p>
      <ul className={`custom-scroll ${styles.modalFeedOrderList}`}>
        {ingriedientsRender.map((item, index) => (
          <li key={index} className={`${styles.modalFeedOrderPointIngriedient}`}>
            <div className={`${styles.ingriedientContent}`}>
              <img
                className={styles.iconIngriedients}
                src={item?.image_mobile}
                alt="ингридиент"
              />
              <p>{item.name}</p>
            </div>
            <Price
              price={`${item.count} x ${item.price}`}
              className={`text text_type_digits-default`}
              typeIcon={'primary'}
            />
          </li>
        ))}
      </ul>
      <div className={`${styles.modalFeedOrderFooter} mt-5`}>
        <p className={`text text_type_main-default text_color_inactive`}>
          {orderCard?.createdAt
            ? formatDateToUI(orderCard?.createdAt)
            : 'не определенно'}
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
