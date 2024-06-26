'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSnackbar } from 'notistack';

import useGetCartProducts from '@/hooks/useGetCartProducts';
import { DiscountType } from '@/types/product.types';
import { useVerifyCouponMutation } from '@/redux/apis/couponApi';
import { numberToCurrency } from '@/utils';
import { PAGE_CHECKOUT, PAGE_COURSES } from '@/routes';

import Button from '../common/Button';
import Card from '../common/Card';
import OutlinedInput from '../common/OutLinedInput';
import CartProduct from './CartProduct';
import styles from './styles.module.scss';

const CartPage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [couponCode, setCouponCode] = useState('');
  const [couponCodeError, setCouponCodeError] = useState('');

  const { cartProducts, cartItemCount, currency } = useGetCartProducts();

  const [verifyCoupon, { data: coupon, isLoading }] = useVerifyCouponMutation();

  const totalPrice = useMemo(
    () =>
      cartProducts.reduce(
        (sum, p) => sum + p.totalPrice - p.productDiscount,
        0
      ),
    [cartProducts]
  );

  const couponDiscount = useMemo(
    () =>
      coupon
        ? coupon.discount.type === DiscountType.fixed
          ? coupon.discount.amount
          : (totalPrice * coupon.discount.amount) / 100
        : 0,
    [coupon, totalPrice]
  );

  const onApplyCoupon = async () => {
    try {
      if (!couponCode) {
        setCouponCodeError('Please enter code');
        return;
      }
      await verifyCoupon({ couponCode }).unwrap();
    } catch (error) {
      enqueueSnackbar('Coupon code is not correct or not available', {
        variant: 'error',
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {cartItemCount === 0 ? (
          <div className={styles.emptyCart}>
            <h2>
              Your cart is empty.
              <Link href={PAGE_COURSES}>Explore courses?</Link>
            </h2>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <h2>You have {cartItemCount} items in your cart</h2>
            <div className={styles.products}>
              {cartProducts.map((product) => (
                <CartProduct key={product.id} product={product} />
              ))}
            </div>

            <div className={styles.priceContent}>
              <Card classes={{ wrapper: styles.promo }}>
                <h3>Have A Promotional Code?</h3>
                <div className={styles.coupon}>
                  <OutlinedInput
                    name="couponCode"
                    value={couponCode}
                    onChange={(_, value) => {
                      setCouponCodeError('');
                      setCouponCode(value);
                    }}
                    type="text"
                    placeholder="Coupon Code"
                    error={couponCodeError}
                  />
                  <Button
                    text="Apply coupon"
                    loading={isLoading}
                    onClick={onApplyCoupon}
                  />
                </div>
              </Card>
              <Card classes={{ wrapper: styles.cartTotal }}>
                <h3>Cart totals</h3>
                <div className={styles.details}>
                  <label>Subtotal</label>
                  <span>
                    {currency && numberToCurrency(currency).format(totalPrice)}
                  </span>
                </div>
                <div className={styles.details}>
                  <label>Promo discount</label>
                  <span>
                    {currency &&
                      numberToCurrency(currency).format(couponDiscount)}
                  </span>
                </div>
                <div className={styles.divider} />
                <div className={styles.details}>
                  <label>Total</label>
                  <span>
                    {currency &&
                      numberToCurrency(currency).format(
                        totalPrice - couponDiscount
                      )}
                  </span>
                </div>

                <Link
                  href={
                    coupon
                      ? `${PAGE_CHECKOUT}?couponCode=${coupon.code}`
                      : PAGE_CHECKOUT
                  }
                >
                  <Button text="Proceed Checkout" stopPropagation={false} />
                </Link>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
