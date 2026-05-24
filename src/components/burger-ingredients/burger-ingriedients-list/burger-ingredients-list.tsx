import { BurgerIngredientPoint } from './burger-ingriedients-point/burger-ingriedients-point';

import type { Ingriedient } from '@/store/types';

import styles from './burger-ingredients-list.module.css';

type BurgerIngredientsListProps = {
  ref: React.Ref<HTMLHeadingElement>;
  ingredients: Ingriedient[];
};

export const BurgerIngredientsList = ({
  ref,
  ingredients,
}: BurgerIngredientsListProps): React.ReactNode => {
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
              // index={index}
              ingredient={ingredient}
            />
          ))
        ) : (
          <p className={`text text_type_main-default`}>Нет доступных ингридиентов</p>
        )}
      </ul>
    </>
  );
};
