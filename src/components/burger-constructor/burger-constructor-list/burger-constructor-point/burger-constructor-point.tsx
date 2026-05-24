import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import {
  deleteIngridient,
  setIngriedientsUser,
  SingriedientsUser,
} from '@/store/constructorSlice/constructorSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooksStore';

import type { Ingriedient } from '@/store/types';

import styles from './burger-constructor-point.module.css';

type BurgerConstructorPointProps = {
  index: number;
  ingredient: Ingriedient;
};

export const BurgerConstructorPoint = ({
  index,
  ingredient,
}: BurgerConstructorPointProps): React.ReactNode => {
  const dispatch = useAppDispatch();
  const ingriedientsUser = useAppSelector(SingriedientsUser);
  const { _id, type, price, name, image_mobile, image } = ingredient;
  const isDraggable = type !== 'bun' && type !== 'bunDefault';

  const moveIngredientConstructor = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      // Запрещаем перемещение булок
      if (dragIndex === 0 || dragIndex === ingriedientsUser.length) return;

      const newIngredients = [...ingriedientsUser];
      const draggedItem = newIngredients[dragIndex];

      // Удаляем элемент из старой позиции
      newIngredients.splice(dragIndex, 1);
      // Вставляем элемент в новую позицию (сохраняем булки на краях)
      newIngredients.splice(hoverIndex, 0, draggedItem);
      dispatch(setIngriedientsUser(newIngredients));
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
    hover: (item: { index: number }) => {
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
    (dragItem: Ingriedient) => {
      const newIngredients = [...ingriedientsUser];
      const isBun = dragItem.type === 'bun' || dragItem.type === 'bunDefault';
      if (isBun) {
        newIngredients.splice(0, 1, dragItem);
        // newIngredients.splice(ingriedientsUser.length, 1, dragItem);
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
    drop(item: Ingriedient) {
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
    (node: HTMLDivElement | null) => {
      dragConstructorRef(node);
      dropConstructorRef(node);
      dropIngridientRef(node);
    },
    [dragConstructorRef, dropConstructorRef]
  );

  // const handleDeleteIngredient = (e: Event): void => {
  //   e.stopPropagation();
  //   dispatch(deleteIngridient({ index }));
  // };
  const handleDeleteIngredient = (): void => {
    dispatch(deleteIngridient({ index }));
  };

  if (type === 'ingriedientDefault') {
    return (
      <p
        className={`text text_type_main-default ${styles.ingriedientDefault}`}
        ref={combinedRef}
      >
        Добавьте ингридиенты
      </p>
    );
  }
  // console.log(ingredient);
  console.log(ingriedientsUser);
  return (
    <div id={'burgerConstructorPoint'} ref={combinedRef} className={`${styles.point}`}>
      {isDraggable ? (
        <button className={`${styles.button}`}>
          <DragIcon type="primary" />
        </button>
      ) : (
        <p className={styles.buttonNone}></p>
      )}
      <div className={styles.pointContent}>
        <ConstructorElement
          extraClass={type === 'bunDefault' ? styles.constructorElement : ''}
          key={index}
          handleClose={handleDeleteIngredient}
          isLocked={index === 0 || index === ingriedientsUser.length}
          price={price}
          text={
            index === 0
              ? `${name}\n(верх)`
              : index === ingriedientsUser.length
                ? `${name}\n(низ)`
                : ingredient.name
            // ingredient.name
            // index === 0 ? (
            //   <>
            //     {name}
            //     <br />
            //     (верх)
            //   </>
            // ) : index === ingriedientsUser.length ? (
            //   <>
            //     {name}
            //     <br />
            //     (низ)
            //   </>
            // ) : (
            //   ingredient.name
            // )
          }
          thumbnail={image_mobile ? image_mobile : image}
          type={
            index === 0
              ? 'top'
              : index === ingriedientsUser.length
                ? 'bottom'
                : undefined
          }
        />
      </div>
    </div>
  );
};
