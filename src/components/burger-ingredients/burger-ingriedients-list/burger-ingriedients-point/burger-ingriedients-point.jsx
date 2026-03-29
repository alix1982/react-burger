import { Counter } from '@krgaa/react-developer-burger-ui-components';

import { Price } from '@/share/price';

import styles from './burger-ingriedients-point.module.css';

export const BurgerIngredientPoint = ({
  ingredient,
  ingriedientsUser,
  setIngriedientsUser,
}) => {
  const handleAddIngriedientsBurger = () => {
    if (ingredient.type !== 'bun') {
      setIngriedientsUser([...ingriedientsUser, ingredient]);
    } else {
      setIngriedientsUser([ingredient, ...ingriedientsUser.slice(1)]);
    }
  };
  return (
    <li className={styles.point}>
      <button className={styles.pointButton} onClick={handleAddIngriedientsBurger}>
        <img className={styles.img} src={ingredient.image} />
        <Counter
          count={ingriedientsUser.filter((item) => item._id === ingredient._id).length}
          size="default"
        />
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
