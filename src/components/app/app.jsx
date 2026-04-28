import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';

import {
  receivingIngridients,
  SisLoading,
} from '@/store/ingriedientsSlice/ingriedientsSlice';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(SisLoading);

  useEffect(() => {
    dispatch(receivingIngridients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <DndProvider backend={HTML5Backend}>
        <main className={`${styles.main} pl-5 pr-5`}>
          {isLoading ? <Preloader /> : <BurgerIngredients />}
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
};
