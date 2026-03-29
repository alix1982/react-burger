import { useState } from 'react';

import { BurgerConstructorPoint } from './burger-constructor-point/burger-constructor-point';

import styles from './burger-constructor-list.module.css';

export const BurgerConstructorList = ({ ingriedientsUser, setIngriedientsUser }) => {
  // console.log(ingriedientsUser);
  // console.log(ingredients);

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null); // Индекс зоны сброса
  const [changedItems, setChangedItems] = useState([]); // Массив изменённых элементов

  // Обработчик начала перетаскивания
  const handleDragStart = (index) => {
    setDraggedIndex(index);
    setDropTargetIndex(null);
    setChangedItems([]); // Сбрасываем подсветку изменений при начале нового перетаскивания
  };

  // Обработчик перемещения над зоной сброса
  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDropTargetIndex(index); // Устанавливаем текущий индекс как зону сброса
  };

  // Обработчик сброса элемента
  const handleDrop = (dropIndex) => {
    console.log('DaD');
    if (draggedIndex === null || draggedIndex === dropIndex || dropIndex === 0) return;

    // Создаём новый массив с перемещённым элементом
    const newIngredients = [...ingriedientsUser];
    const draggedItem = newIngredients[draggedIndex];

    // Удаляем элемент из старой позиции
    newIngredients.splice(draggedIndex, 1);
    // Вставляем элемент в новую позицию
    newIngredients.splice(dropIndex, 0, draggedItem);

    setIngriedientsUser(newIngredients);
    setDraggedIndex(null);
    setDropTargetIndex(null);

    // Добавляем индексы старого и нового положения в массив изменённых элементов
    const updatedChanged = [...changedItems, draggedIndex, dropIndex];
    setChangedItems(updatedChanged);

    // Автоматически убираем подсветку через 2 секунды
    setTimeout(() => {
      setChangedItems([]);
    }, 2000);
  };

  return (
    <>
      {/* <h1 className={`text text_type_main-medium ${styles.heading}`}>
        {ingredients[0].type === 'bun'
          ? 'Булки'
          : ingredients[0].type === 'main'
            ? 'Начинка'
            : 'Соусы'}
      </h1> */}
      <ul
        className={`custom-scroll ${styles.list}`}
        onDragOver={(e) => e.preventDefault()} // Разрешаем сброс на уровне списка
      >
        {ingriedientsUser?.length > 0 ? (
          <>
            {ingriedientsUser.map((ingredient, index) => (
              <BurgerConstructorPoint
                key={index}
                index={index}
                ingredient={ingredient}
                ingriedientsUser={ingriedientsUser}
                setIngriedientsUser={setIngriedientsUser}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                onDragOver={handleDragOver} // Передаём обработчик для подсветки зоны сброса
                isDragged={draggedIndex === index}
                isDropTarget={dropTargetIndex === index} // Передаём флаг зоны сброса
                isChanged={changedItems.includes(index)} // Передаём флаг изменения
              />
            ))}
            {(ingriedientsUser[0].type === 'bun' ||
              ingriedientsUser[0].type === 'bunDefault') && (
              <BurgerConstructorPoint
                index={ingriedientsUser.length}
                ingredient={ingriedientsUser[0]}
                ingriedientsUser={ingriedientsUser}
                setIngriedientsUser={setIngriedientsUser}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver} // Передаём обработчик для подсветки зоны сброса
                isDragged={draggedIndex === ingriedientsUser.length}
                isDropTarget={dropTargetIndex === ingriedientsUser.length} // Передаём флаг зоны сброса
                isChanged={changedItems.includes(ingriedientsUser.length)} // Передаём флаг изменения
              />
            )}
          </>
        ) : (
          <p className={`text text_type_main-default`}>Выберете ингридиенты</p>
        )}
      </ul>
    </>
  );
};
