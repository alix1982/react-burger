import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { Modal } from '@/components/modal/modal';
import { IngredientDetails } from '@/components/modal/modal-content/ingredient-details';

import styles from './burger-constructor-point.module.css';

export const BurgerConstructorPoint = ({
  index,
  ingredient,
  ingriedientsUser,
  setIngriedientsUser,
  onDragStart,
  onDrop,
  onDragOver,
  isDragged,
  isDropTarget,
  isChanged,
}) => {
  const [isModalOpenIngriedient, setIsModalOpenIngriedient] = useState(false);

  const handleOnIngriedients = () => {
    setIsModalOpenIngriedient(true);
  };
  const handleDeleteIngredient = (e) => {
    e.stopPropagation();
    const newIngredients = [...ingriedientsUser];
    newIngredients.splice(index, 1);
    setIngriedientsUser(newIngredients);
  };
  const isDraggable = ingredient.type !== 'bun' && ingredient.type !== 'bunDefault';

  return (
    <div
      id={'burgerConstructorPoint'}
      className={`
        ${styles.point}
        ${isDragged && isDraggable ? styles.dragged : ''}
        ${isDropTarget && isDraggable ? styles.dropTarget : ''}
        ${isChanged && isDraggable ? styles.changed : ''}
      `}
      draggable={isDraggable}
      onDragStart={() => {
        onDragStart(index);
      }}
      onDrop={() => {
        onDrop(index);
      }}
      onDragOver={(e) => onDragOver(e, index)}
      style={{ overflow: 'hidden' }}
    >
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
          handleClose={handleDeleteIngredient}
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
        isOpen={isModalOpenIngriedient}
        onClose={() => setIsModalOpenIngriedient(false)}
        containerId={'burgerConstructorPoint'}
      >
        <IngredientDetails ingriedient={ingredient} />
      </Modal>
    </div>
  );
};
