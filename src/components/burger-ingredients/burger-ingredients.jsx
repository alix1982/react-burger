import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { BurgerIngredientsList } from './burger-ingriedients-list/burger-ingredients-list';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({
  ingredients,
  ingriedientsUser,
  setIngriedientsUser,
}) => {
  const [menuPoint, setMenuPoint] = useState('bun');
  const [ingredientsBun, setIngredientsBun] = useState([]);
  const [ingredientsMain, setIngredientsMain] = useState([]);
  const [ingredientsSouce, setIngredientsSouce] = useState([]);
  useEffect(() => {
    setIngredientsBun(ingredients.filter((item) => item.type === 'bun'));
    setIngredientsMain(ingredients.filter((item) => item.type === 'main'));
    setIngredientsSouce(ingredients.filter((item) => item.type === 'sauce'));
  }, [ingredients]);

  return (
    <section className={styles.burger_ingredients}>
      <nav className={styles.burger_nav}>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={menuPoint === 'bun' ? true : false}
            onClick={() => {
              setMenuPoint('bun');
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={menuPoint === 'main' ? true : false}
            onClick={() => {
              setMenuPoint('main');
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="souce"
            active={menuPoint === 'souce' ? true : false}
            onClick={() => {
              setMenuPoint('souce');
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <BurgerIngredientsList
        ingredients={
          menuPoint === 'bun'
            ? ingredientsBun
            : menuPoint === 'main'
              ? ingredientsMain
              : ingredientsSouce
        }
        ingriedientsUser={ingriedientsUser}
        setIngriedientsUser={setIngriedientsUser}
      />
    </section>
  );
};
