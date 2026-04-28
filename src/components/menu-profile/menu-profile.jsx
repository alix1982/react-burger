import { NavLink } from 'react-router-dom';

import styles from './menu-profile.module.css';

export const MenuProfile = () => {
  return (
    <nav className={`${styles.menu}`}>
      <ul className={`${styles.menuList}`}>
        <li className={`${styles.menuPoint} text text_type_main-medium`}>
          <NavLink
            to={`/profile`}
            end
            className={({ isActive }) =>
              isActive ? styles.menuPointLink_active : styles.menuPointLink_unactive
            }
          >
            Профиль
          </NavLink>
        </li>
        <li className={`${styles.menuPoint} text text_type_main-medium`}>
          <NavLink
            to={`/profile/orders`}
            className={({ isActive }) =>
              isActive ? styles.menuPointLink_active : styles.menuPointLink_unactive
            }
          >
            История заказов
          </NavLink>
        </li>
        <li className={`${styles.menuPoint} text text_type_main-medium`}>
          <NavLink
            to={`/profile/exit`}
            className={({ isActive }) =>
              isActive ? styles.menuPointLink_active : styles.menuPointLink_unactive
            }
          >
            Выход
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
