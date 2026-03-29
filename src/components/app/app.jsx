import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState, useTransition } from 'react';

import { getIngriedients } from '@/store/apiSlice';
import { BUN_DEFAULT } from '@/utils/constant';
import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import styles from './app.module.css';

export const App = () => {
  const [ingriedients, setIngriedients] = useState([]); // в redux
  const [ingriedientsUser, setIngriedientsUser] = useState(BUN_DEFAULT); // в redux
  const [isPending, startTransition] = useTransition();
  async function fetchIngriedients() {
    try {
      const response = await getIngriedients();
      setIngriedients(response.data.data);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      throw error;
    }
  }

  useEffect(() => {
    startTransition(() => fetchIngriedients());
    // fetchIngriedients();
  }, []);

  // console.log(ingriedientsUser);
  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {isPending ? (
          <Preloader />
        ) : (
          <BurgerIngredients
            ingredients={ingriedients}
            ingriedientsUser={ingriedientsUser}
            setIngriedientsUser={setIngriedientsUser}
          />
        )}
        <BurgerConstructor
          ingredients={ingriedients}
          ingriedientsUser={ingriedientsUser}
          setIngriedientsUser={setIngriedientsUser}
        />
      </main>
    </div>
  );
};
