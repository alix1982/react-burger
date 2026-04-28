import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

export const Price = ({
  price = 0,
  className = 'text text_type_main-default',
  typeIcon = 'primary',
}) => {
  return (
    <p className={className}>
      {price}
      &nbsp;
      {price !== '' && <CurrencyIcon type={typeIcon} />}
    </p>
  );
};
