import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// import { SuserAuth } from '@/store/authSlice/authSlice';
import { SisAuthChecked } from '@/store/authSlice/authSlice';
import {
  receivingIngridients,
  SisLoading,
} from '@/store/ingriedientsSlice/ingriedientsSlice';
// import { Suser } from '@/store/userSlice/userSlice';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './home-page.module.css';
// import { Suser } from '@/store/userSlice/userSlice';

export const HomePage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(SisLoading);
  // const userAuth = useSelector(SuserAuth);
  // const user = useSelector(Suser);
  const isAuthChecked = useSelector(SisAuthChecked);
  // console.log(userAuth);
  // console.log(user);
  console.log(isAuthChecked);
  useEffect(() => {
    dispatch(receivingIngridients());
  }, []);

  return (
    <div className={styles.home}>
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
      <Outlet />
    </div>
  );
};
