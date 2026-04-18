import { BurgerIngredientPoint } from './burger-ingriedients-point/burger-ingriedients-point';

import styles from './burger-ingredients-list.module.css';

export const BurgerIngredientsList = ({
  ref,
  ingredients,
  ingriedientsUser,
  setIngriedientsUser,
}) => {
  return (
    <>
      <h1 className={`text text_type_main-medium ${styles.heading}`} ref={ref}>
        {ingredients.length > 0 &&
          (ingredients[0]?.type === 'bun'
            ? 'Булки'
            : ingredients[0]?.type === 'main'
              ? 'Начинка'
              : 'Соусы')}
      </h1>
      <ul className={styles.list}>
        {ingredients?.length > 0 ? (
          ingredients.map((ingredient) => (
            <BurgerIngredientPoint
              key={ingredient._id}
              ingredient={ingredient}
              ingriedientsUser={ingriedientsUser}
              setIngriedientsUser={setIngriedientsUser}
            />
          ))
        ) : (
          <p className={`text text_type_main-default`}>Нет доступных булок</p>
        )}
      </ul>
    </>
  );
};
