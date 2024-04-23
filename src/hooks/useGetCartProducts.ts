import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { DiscountRuleType, DiscountType } from '@/types/product.types';
import { RootState } from '@/redux/store';

const useGetCartProducts = () => {
  const products = useSelector((state: RootState) => state.app.cartProducts);

  const cartProducts = useMemo(
    () =>
      products.map((product) => {
        const totalPrice = product.items.reduce(
          (sum, item) => sum + item.price * item.count,
          0
        );
        const totalItems = product.items.reduce(
          (sum, item) => sum + item.count,
          0
        );

        let discount = 0;
        let discountAvailable = false;
        if (product.discount) {
          if (
            (product.discount.rule_amount &&
              product.discount.rule_type === DiscountRuleType.count &&
              totalItems >= product.discount.rule_amount) ||
            (product.discount.rule_amount &&
              product.discount.rule_type === DiscountRuleType.amount &&
              totalPrice >= product.discount.rule_amount)
          ) {
            discountAvailable = true;
          }

          if (discountAvailable && product.discount.amount) {
            if (product.discount.type === DiscountType.fixed) {
              discount = product.discount.amount;
            } else if (product.discount.type === DiscountType.percent) {
              discount = (totalPrice * product.discount.amount) / 100;
            }
          }
        }

        const productDiscount = discount;

        return {
          ...product,
          totalPrice,
          totalItems,
          productDiscount,
        };
      }),
    [products]
  );

  const cartItemCount = useMemo(() => products.length, [products]);

  const currency = useMemo(
    () => (products.length > 0 ? products[0].currency : undefined),
    [products]
  );

  return { cartProducts, cartItemCount, currency };
};

export default useGetCartProducts;
