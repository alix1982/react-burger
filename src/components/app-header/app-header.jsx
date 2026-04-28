import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import styles from './app-header.module.css';

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          {/* Тут должны быть ссылки, а не например кнопки или абзацы */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link_active} ml-10` : `${styles.link} ml-10`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <BurgerIcon type="primary" />
                ) : (
                  <BurgerIcon type="secondary" />
                )}
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </>
            )}
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              isActive ? `${styles.link_active} ml-10` : `${styles.link} ml-10`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? <ListIcon type="primary" /> : <ListIcon type="secondary" />}
                <p className="text text_type_main-default ml-2">Лента заказов</p>
              </>
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${styles.link_active} ml-10` : `${styles.link} ml-10`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? (
                <ProfileIcon type="primary" />
              ) : (
                <ProfileIcon type="secondary" />
              )}
              <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
