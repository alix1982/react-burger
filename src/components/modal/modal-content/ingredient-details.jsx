import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ ingriedient }) => {
  return (
    <article className={`${styles.modal_ingriedient}`}>
      <img className={`${styles.img} pr-10 pl-10 pb-4`} src={ingriedient.image} />
      <p className={`text text_type_main-medium pb-8`}>{ingriedient.name}</p>
      <div
        className={`text text_type_main-default text_color_inactive ${styles.ingriedient_data}`}
      >
        <p
          className={`text text_type_main-default text_color_inactive ${styles.ingriedient_calories}`}
        >
          <span>Калории,ккал</span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingriedient?.calories ? ingriedient?.calories : '-'}
          </span>
        </p>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.ingriedient_calories}`}
        >
          <span>Белки, г</span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingriedient?.proteins ? ingriedient?.proteins : '-'}
          </span>
        </p>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.ingriedient_calories}`}
        >
          <span>Жиры, г</span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingriedient?.fat ? ingriedient?.fat : '-'}
          </span>
        </p>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.ingriedient_calories}`}
        >
          <span>Углеводы, г</span>
          <span className={`text text_type_digits-default text_color_inactive`}>
            {ingriedient?.carbohydrates ? ingriedient?.carbohydrates : '-'}
          </span>
        </p>
      </div>
    </article>
  );
};
