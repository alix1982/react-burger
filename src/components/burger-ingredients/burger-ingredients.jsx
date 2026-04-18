import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';

import { BurgerIngredientsList } from './burger-ingriedients-list/burger-ingredients-list';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = ({
  ingredients,
  ingriedientsUser,
  setIngriedientsUser,
}) => {
  const [menuPoint, setMenuPoint] = useState('bun');
  const [ingredientsBun, setIngredientsBun] = useState([]);
  const [ingredientsMain, setIngredientsMain] = useState([]);
  const [ingredientsSouce, setIngredientsSouce] = useState([]);
  const contentIngridients = useRef(null);
  const scrolls = {
    bun: useRef(null),
    main: useRef(null),
    souce: useRef(null),
  };

  useEffect(() => {
    setIngredientsBun(ingredients.filter((item) => item.type === 'bun'));
    setIngredientsMain(ingredients.filter((item) => item.type === 'main'));
    setIngredientsSouce(ingredients.filter((item) => item.type === 'sauce'));
  }, [ingredients]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = contentIngridients.current;
      const scrollContainerPosition =
        scrollContainer.offsetTop + scrollContainer.scrollTop + 40;
      const scrollContainerBun = scrolls.bun.current;
      const scrollContainerSouce = scrolls.souce.current;
      const scrollContainerMain = scrolls.main.current;
      // Проверяем секции в порядке их следования на странице
      if (
        scrollContainerBun &&
        scrollContainerPosition >= scrollContainerBun.offsetTop - 200
      ) {
        setMenuPoint('bun');
      }
      if (
        scrollContainerSouce &&
        scrollContainerPosition >= scrollContainerSouce.offsetTop - 200
      ) {
        setMenuPoint('souce');
      }
      if (
        scrollContainerMain &&
        scrollContainerPosition >= scrollContainerMain.offsetTop - 200
      ) {
        setMenuPoint('main');
      }
    };

    // Добавляем обработчик скролла
    if (contentIngridients.current) {
      contentIngridients.current.addEventListener('scroll', handleScroll);
      handleScroll(); // проверка при загрузке
    }

    // Очистка — удаляем обработчик при размонтировании компонента
    return () => {
      if (contentIngridients.current) {
        contentIngridients.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrolls]);
  console.log(menuPoint);
  return (
    <section className={styles.burger_ingredients}>
      <nav className={styles.burger_nav}>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={menuPoint === 'bun' ? true : false}
            onClick={() => {
              setMenuPoint('bun');
              scrolls.bun.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          >
            Булки
          </Tab>
          <Tab
            value="souce"
            active={menuPoint === 'souce' ? true : false}
            onClick={() => {
              setMenuPoint('souce');
              scrolls.souce.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={menuPoint === 'main' ? true : false}
            onClick={() => {
              setMenuPoint('main');
              scrolls.main.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          >
            Начинки
          </Tab>
        </ul>
      </nav>
      <article className={`custom-scroll ${styles.content}`} ref={contentIngridients}>
        <BurgerIngredientsList
          ref={scrolls.bun}
          ingredients={ingredientsBun}
          ingriedientsUser={ingriedientsUser}
          setIngriedientsUser={setIngriedientsUser}
        />
        <BurgerIngredientsList
          ref={scrolls.souce}
          ingredients={ingredientsSouce}
          ingriedientsUser={ingriedientsUser}
          setIngriedientsUser={setIngriedientsUser}
        />
        <BurgerIngredientsList
          ref={scrolls.main}
          ingredients={ingredientsMain}
          ingriedientsUser={ingriedientsUser}
          setIngriedientsUser={setIngriedientsUser}
        />
      </article>
    </section>
  );
};
