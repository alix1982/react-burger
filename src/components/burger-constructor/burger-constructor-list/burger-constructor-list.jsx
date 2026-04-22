import { useSelector } from 'react-redux';

import { SingriedientsUser } from '@/store/constructorSlice/constructorSlice';

import { BurgerConstructorPoint } from './burger-constructor-point/burger-constructor-point';

import styles from './burger-constructor-list.module.css';

export const BurgerConstructorList = () => {
  const ingriedientsUser = useSelector(SingriedientsUser);

  return (
    <>
      {ingriedientsUser?.length > 0 &&
        (ingriedientsUser[0]?.type === 'bun' ||
          ingriedientsUser[0]?.type === 'bunDefault') && (
          <BurgerConstructorPoint index={0} ingredient={ingriedientsUser[0]} />
        )}
      <ul className={`custom-scroll ${styles.list}`}>
        {ingriedientsUser?.length > 1 &&
          ingriedientsUser.map((ingredient, index) => {
            if (index !== 0) {
              return (
                <li key={ingredient.uuid} className={styles.listPoint}>
                  <BurgerConstructorPoint index={index} ingredient={ingredient} />
                </li>
              );
            }
          })}
      </ul>
      {ingriedientsUser?.length > 0 &&
        (ingriedientsUser[0]?.type === 'bun' ||
          ingriedientsUser[0]?.type === 'bunDefault') && (
          <BurgerConstructorPoint
            index={ingriedientsUser.length}
            ingredient={ingriedientsUser[0]}
          />
        )}
    </>
  );
};
