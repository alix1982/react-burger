import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';

import { useAppSelector } from '@/store/hooksStore';
import { SerrorMes, Singriedients } from '@/store/ingriedientsSlice/ingriedientsSlice';

import { BurgerIngredientsList } from './burger-ingriedients-list/burger-ingredients-list';

import type { Ingriedient } from '@/store/types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.ReactNode => {
  const ingriedients = useAppSelector(Singriedients);
  const errorGetIngridients = useAppSelector(SerrorMes);
  const [menuPoint, setMenuPoint] = useState<'bun' | 'souce' | 'main'>('bun');
  const [ingredientsBun, setIngredientsBun] = useState<Ingriedient[]>([]);
  const [ingredientsMain, setIngredientsMain] = useState<Ingriedient[]>([]);
  const [ingredientsSouce, setIngredientsSouce] = useState<Ingriedient[]>([]);
  const contentIngridients = useRef<HTMLElement>(null);
  const scrolls = {
    bun: useRef<HTMLHeadingElement>(null),
    main: useRef<HTMLHeadingElement>(null),
    souce: useRef<HTMLHeadingElement>(null),
  };

  useEffect(() => {
    if (Array.isArray(ingriedients) && ingriedients.length > 0) {
      setIngredientsBun(ingriedients.filter((item) => item.type === 'bun'));
      setIngredientsMain(ingriedients.filter((item) => item.type === 'main'));
      setIngredientsSouce(ingriedients.filter((item) => item.type === 'sauce'));
    }
  }, [ingriedients]);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollContainer = contentIngridients.current;
      const scrollContainerPosition = scrollContainer
        ? scrollContainer.offsetTop + scrollContainer.scrollTop + 40
        : 40;
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
    return (): void => {
      if (contentIngridients.current) {
        contentIngridients.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrolls]);

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
      {errorGetIngridients === '' ? (
        <article className={`custom-scroll ${styles.content}`} ref={contentIngridients}>
          <BurgerIngredientsList ref={scrolls.bun} ingredients={ingredientsBun} />
          <BurgerIngredientsList ref={scrolls.souce} ingredients={ingredientsSouce} />
          <BurgerIngredientsList ref={scrolls.main} ingredients={ingredientsMain} />
        </article>
      ) : (
        <p>{errorGetIngridients}</p>
      )}
    </section>
  );
};
