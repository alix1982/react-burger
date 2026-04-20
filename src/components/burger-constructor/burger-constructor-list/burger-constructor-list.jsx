import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@/components/modal/modal';
import { IngredientDetails } from '@/components/modal/modal-content/ingredient-details';
import { SingriedientsUser } from '@/store/constructorSlice/constructorSlice';
import { setIngridientModal, SingriedientModal } from '@/store/modalSlice/modalSlice';
import { BUN_DEFAULT } from '@/utils/constant';

import { BurgerConstructorPoint } from './burger-constructor-point/burger-constructor-point';

import styles from './burger-constructor-list.module.css';

export const BurgerConstructorList = () => {
  const dispatch = useDispatch();
  const ingriedientsUser = useSelector(SingriedientsUser);
  const ingridientModalOn = useSelector(SingriedientModal);

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
      <Modal
        heading={'Детали ингредиента'}
        isOpen={ingridientModalOn}
        onClose={() => {
          dispatch(
            setIngridientModal({ isModalIngridient: false, ingredient: BUN_DEFAULT[0] })
          );
        }}
        containerId={'burgerConstructorPoint'}
      >
        <IngredientDetails />
      </Modal>
    </>
  );
};
