// import { useEffect } from 'react';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  // receivingIngridients,
  Singriedients,
  SisLoading,
} from '@/store/ingriedientsSlice/ingriedientsSlice';
import { BUN_DEFAULT } from '@/utils/constant';

import styles from './ingredient-details.module.css';

export const IngredientDetails = () => {
  const { id } = useParams();
  const ingriedients = useSelector(Singriedients);
  const isLoading = useSelector(SisLoading);

  let ingriedientCard = ingriedients.find((item) => item._id === id);

  if (!ingriedientCard) {
    ingriedientCard = BUN_DEFAULT[0];
  }
  // console.log(ingriedientCard);

  const { image, name, calories, proteins, fat, carbohydrates } = ingriedientCard;

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <article className={`${styles.modal_ingriedient}`}>
      <img className={`${styles.img} pr-10 pl-10 pb-4`} src={image} />
      <p className={`text text_type_main-medium pb-8`}>{name}</p>
      <div
        className={`text text_type_main-default text_color_inactive ${styles.ingriedient_data}`}
      >
        <p
          className={`text text_type_main-default text_color_inactive ${styles.ingriedient_calories}`}
        >
          <span>Калории,ккал</span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {calories ? calories : '-'}
          </span>
        </p>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.ingriedient_calories}`}
        >
          <span>Белки, г</span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {proteins ? proteins : '-'}
          </span>
        </p>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.ingriedient_calories}`}
        >
          <span>Жиры, г</span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {fat ? fat : '-'}
          </span>
        </p>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.ingriedient_calories}`}
        >
          <span>Углеводы, г</span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {carbohydrates ? carbohydrates : '-'}
          </span>
        </p>
      </div>
    </article>
  );
};
