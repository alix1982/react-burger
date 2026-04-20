import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
// import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@/components/modal/modal';
import { IngredientDetails } from '@/components/modal/modal-content/ingredient-details';
import {
  deleteIngridient,
  setIngriedientsUser,
  SingriedientsUser,
} from '@/store/constructorSlice/constructorSlice';
import { setIngridientModal, SingriedientModal } from '@/store/modalSlice/modalSlice';

import styles from './burger-constructor-point.module.css';

export const BurgerConstructorPoint = ({ index, ingredient }) => {
  const dispatch = useDispatch();
  const ingriedientsUser = useSelector(SingriedientsUser);
  const ingridientModalOn = useSelector(SingriedientModal);
  const { _id } = ingredient;
  const isDraggable = ingredient.type !== 'bun' && ingredient.type !== 'bunDefault';

  const moveIngredientConstructor = useCallback(
    (dragIndex, hoverIndex) => {
      console.log('moveIngredientConstructor');
      // Запрещаем перемещение булок
      if (dragIndex === 0 || dragIndex === ingriedientsUser.length) return;

      const newIngredients = [...ingriedientsUser];
      const draggedItem = newIngredients[dragIndex];

      // Удаляем элемент из старой позиции
      newIngredients.splice(dragIndex, 1);
      // Вставляем элемент в новую позицию (сохраняем булки на краях)
      newIngredients.splice(hoverIndex, 0, draggedItem);
      dispatch(setIngriedientsUser(newIngredients));
      // setIngriedientsUser(newIngredients);
    },
    [ingriedientsUser]
  );

  const [, dragConstructorRef] = useDrag({
    type: 'constructor',
    item: { _id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isDraggable,
  });

  const [, dropConstructorRef] = useDrop({
    accept: 'constructor',
    hover: (item) => {
      if (!isDraggable) return;
      const dragIndex = item.index;
      if (dragIndex !== index) {
        moveIngredientConstructor?.(dragIndex, index);
        item.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const moveIngredient = useCallback(
    (dragItem) => {
      const newIngredients = [...ingriedientsUser];
      const isBun = dragItem.type === 'bun' || dragItem.type === 'bunDefault';
      if (isBun) {
        newIngredients.splice(0, 1, dragItem);
      } else {
        if (index !== 0 && index !== ingriedientsUser.length) {
          newIngredients.splice(index, 0, dragItem);
        }
      }
      dispatch(setIngriedientsUser(newIngredients));
    },
    [ingriedientsUser]
  );

  const [, dropIngridientRef] = useDrop({
    accept: 'ingridient',
    drop(item) {
      moveIngredient?.(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      isHover: monitor.isOver(),
    }),
  });

  // Объединяем refs для drag и drop
  const combinedRef = useCallback(
    (node) => {
      dragConstructorRef(node);
      dropConstructorRef(node);
      dropIngridientRef(node);
    },
    [dragConstructorRef, dropConstructorRef]
  );

  const handleOnIngriedients = () => {
    dispatch(setIngridientModal(true));
  };
  // const handleDeleteIngredient = (e) => {
  //   e.stopPropagation();
  //   const newIngredients = [...ingriedientsUser];
  //   newIngredients.splice(index, 1);
  //   dispatch(setIngriedientsUser(newIngredients));
  // };

  return (
    <div id={'burgerConstructorPoint'} ref={combinedRef} className={`${styles.point}`}>
      {isDraggable ? (
        <button className={`${styles.button}`}>
          <DragIcon type="primary" />
        </button>
      ) : (
        <p className={styles.buttonNone}></p>
      )}
      <div className={styles.pointContent} onClick={handleOnIngriedients}>
        <ConstructorElement
          extraClass={ingredient.type === 'bunDefault' && styles.constructorElement}
          key={index}
          handleClose={(e) => dispatch(deleteIngridient({ index, e }))}
          isLocked={index === 0 || index === ingriedientsUser.length}
          price={ingredient.price}
          text={
            // ingredient.name
            index === 0 ? (
              <>
                {ingredient.name}
                <br />
                (верх)
              </>
            ) : index === ingriedientsUser.length ? (
              <>
                {ingredient.name}
                <br />
                (низ)
              </>
            ) : (
              ingredient.name
            )
          }
          thumbnail={
            ingredient.image_mobile ? ingredient.image_mobile : ingredient.image
          }
          type={
            index === 0 ? 'top' : index === ingriedientsUser.length ? 'bottom' : 'normal'
          }
        />
      </div>
      <Modal
        heading={'Детали ингредиента'}
        isOpen={ingridientModalOn}
        onClose={() => {
          dispatch(setIngridientModal(false));
        }}
        containerId={'burgerConstructorPoint'}
      >
        <IngredientDetails ingriedient={ingredient} />
      </Modal>
    </div>
  );
};
