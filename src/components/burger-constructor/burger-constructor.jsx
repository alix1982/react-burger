import { BurgerConstructorList } from './burger-constructor-list/burger-constructor-list';
import { BurgerConstructorFinalPrice } from './burger-constructor-price/burger-constructor-price';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = ({ ingriedientsUser, setIngriedientsUser }) => {
  return (
    <section className={styles.burger_constructor}>
      <BurgerConstructorList
        ingriedientsUser={ingriedientsUser}
        setIngriedientsUser={setIngriedientsUser}
      />
      <BurgerConstructorFinalPrice
        ingriedientsUser={ingriedientsUser}
        setIngriedientsUser={setIngriedientsUser}
      />
    </section>
  );
};
