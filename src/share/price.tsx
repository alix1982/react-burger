import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

type PriceProps = {
  price: number | string;
  className: string;
  typeIcon: 'primary' | 'secondary';
};

export const Price = ({
  price = 0,
  className = 'text text_type_main-default',
  typeIcon = 'primary',
}: PriceProps): React.ReactNode => {
  return (
    <p className={className}>
      {price}
      &nbsp;
      {price !== '' && <CurrencyIcon type={typeIcon} />}
    </p>
  );
};
