import { Counter } from '@krgaa/react-developer-burger-ui-components';
import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import { Price } from '@/share/price';
import { SingriedientsUser } from '@/store/constructorSlice/constructorSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooksStore';
import { setIngridientModal } from '@/store/modalSlice/modalSlice';

import type { Ingriedient } from '@/store/types';

import styles from './burger-ingriedients-point.module.css';

type BurgerIngredientPointProps = {
  ingredient: Ingriedient;
};

export const BurgerIngredientPoint = ({
  ingredient,
}: BurgerIngredientPointProps): React.ReactNode => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ingriedientsUser = useAppSelector(SingriedientsUser);

  // const { _id, name, price, image, type } = ingredient;
  // const isDraggable = type !== 'bun' && type !== 'bunDefault';

  const liRef = React.useRef<HTMLLIElement>(null);
  const [{ isDragging }, dragIngridientRef] = useDrag({
    type: 'ingridient',
    // item: { _id, name, price, image, type },
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // canDrag: isDraggable,
  });

  // Объединяем refs
  const combinedRef = React.useCallback(
    (node: HTMLLIElement | null) => {
      if (node) {
        liRef.current = node;
        dragIngridientRef(node); // передаём узел в react-dnd
      }
    },
    [dragIngridientRef]
  );

  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (ingredient.type !== 'bun') {
      setCounter(ingriedientsUser.filter((item) => item._id === ingredient._id).length);
    } else {
      setCounter(
        ingriedientsUser.filter((item) => item._id === ingredient._id).length * 2
      );
    }
  }, [ingriedientsUser]);

  const handleOnIngriedients = (): void => {
    // dispatch(setIngridientModal({ isModalIngridient: true, ingredient }));
    dispatch(setIngridientModal({ ingredient }));

    navigate(`/ingredients/${ingredient._id}`);
  };
  // const handleAddIngriedientsBurger = () => {
  //   // dispatch(addIngriedientsBurger)
  //   if (ingredient.type !== 'bun') {
  //     dispatch(setIngriedientsUser([...ingriedientsUser, ingredient]));
  //     // setIngriedientsUser([...ingriedientsUser, ingredient]);
  //   } else {
  //     dispatch(setIngriedientsUser([ingredient, ...ingriedientsUser.slice(1)]));

  //     // setIngriedientsUser([ingredient, ...ingriedientsUser.slice(1)]);
  //   }
  // };

  return (
    <li
      className={`${styles.point} ${isDragging ? styles.pointDrag : ''}`}
      ref={combinedRef}
    >
      <button
        className={styles.pointButton}
        onClick={handleOnIngriedients}
        // onClick={() => dispatch(addIngriedientsBurger({ ingredient }))}
      >
        <img className={styles.img} src={ingredient.image} />
        {counter > 0 && <Counter count={counter} size="default" />}
        <Price
          price={ingredient.price}
          className={`text text_type_digits-default ${styles.price}`}
          typeIcon={'primary'}
        />
        <p className={`text text_type_main-default ${styles.name}`}>{ingredient.name}</p>
      </button>
    </li>
  );
};
