import { Counter } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { Price } from '@/share/price';
import { SingriedientsUser } from '@/store/constructorSlice/constructorSlice';
import { setIngridientModal } from '@/store/modalSlice/modalSlice';

import styles from './burger-ingriedients-point.module.css';

export const BurgerIngredientPoint = ({ ingredient }) => {
  const dispatch = useDispatch();
  const ingriedientsUser = useSelector(SingriedientsUser);

  // const { _id, name, price, image, type } = ingredient;
  // const isDraggable = type !== 'bun' && type !== 'bunDefault';

  const [{ isDragging }, dragIngridientRef] = useDrag({
    type: 'ingridient',
    // item: { _id, name, price, image, type },
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // canDrag: isDraggable,
  });

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (ingredient.type !== 'bun') {
      setCounter(ingriedientsUser.filter((item) => item._id === ingredient._id).length);
    } else {
      setCounter(
        ingriedientsUser.filter((item) => item._id === ingredient._id).length * 2
      );
    }
  }, [ingriedientsUser]);

  const handleOnIngriedients = () => {
    dispatch(setIngridientModal({ isModalIngridient: true, ingredient }));
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
      ref={dragIngridientRef}
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
