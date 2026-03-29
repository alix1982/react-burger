import {
  ConstructorElement,
  // DeleteIcon,
  DragIcon,
  // LockIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

// import { Price } from '@/share/price';
import { Modal } from '@/components/modal/modal';
import { IngredientDetails } from '@/components/modal/modal-content/ingredient-details';

import styles from './burger-constructor-point.module.css';

export const BurgerConstructorPoint = ({
  ingredient,
  ingriedientsUser,
  setIngriedientsUser,
  index,
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
    // console.log('оформили');
  };
  const handleDeleteIngredient = () => {
    const newIngredients = [...ingriedientsUser];
    newIngredients.splice(index, 1);
    setIngriedientsUser(newIngredients);
  };
  const isDraggable = ingredient.type !== 'bun' && ingredient.type !== 'bunDefault';

  return (
    <li
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
          text={ingredient.name}
          thumbnail={
            ingredient.image_mobile ? ingredient.image_mobile : ingredient.image
          }
          type={
            index === 0 ? 'top' : index === ingriedientsUser.length ? 'bottom' : 'normal'
          }
        />
      </div>
      {/* <div className={styles.pointButton}>
        {ingredient.type !== 'bunDefault' && (
          <img
            className={styles.img}
            src={ingredient.image_mobile ? ingredient.image_mobile : ingredient.image}
            alt={ingredient.name}
          />
        )}
        <div className={styles.pointButton_content}>
          <p className={`text text_type_main-default ${styles.name}`}>
            {ingredient.name}
          </p>
          <Price
            price={ingredient.type === 'bunDefault' ? '' : ingredient.price}
            className={`text text_type_digits-default ${styles.price}`}
            typeIcon={'primary'}
          />
        </div>
        {isDraggable ? (
          <button className={styles.button} onClick={handleDeleteIngredient}>
            <DeleteIcon type="primary" />
          </button>
        ) : (
          <button className={styles.button} disabled>
            <LockIcon type="secondary" />
          </button>
        )}
      </div> */}
      <Modal
        heading={'Детали ингредиента'}
        isOpen={isModalOpenIngriedient}
        onClose={() => setIsModalOpenIngriedient(false)}
        containerId={'burgerConstructorPoint'}
      >
        <IngredientDetails ingriedient={ingredient} />
      </Modal>
    </li>
  );
};
