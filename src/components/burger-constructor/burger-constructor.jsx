import { BurgerConstructorList } from './burger-constructor-list/burger-constructor-list';
import { BurgerConstructorFinalPrice } from './burger-constructor-price/burger-constructor-price';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  return (
    <section className={styles.burger_constructor}>
      <BurgerConstructorList />
      <BurgerConstructorFinalPrice />
    </section>
  );
};
