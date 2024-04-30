'use client';

import { Dispatch, RefObject, SetStateAction, useEffect, useMemo } from 'react';
import { Collapse, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  loadStripe,
  type Stripe,
  type StripeElements,
} from '@stripe/stripe-js';

import useGetCartProducts from '@/hooks/useGetCartProducts';
import Card from '@/components/common/Card';
import { ICoupon } from '@/types/coupon.types';
import { PaymentGateway } from '@/types/order.types';
import { DiscountType } from '@/types/product.types';
import { numberToCurrency } from '@/utils';

import Product from './Product';
import styles from './styles.module.scss';

const stripePromise = loadStripe(String(process.env.NEXT_PUBLIC_STRIPE_KEY));

export interface IStripeRefObject {
  elements: StripeElements | null;
  stripe: Stripe | null;
}

interface IStripeFromProps {
  stripeRef: RefObject<IStripeRefObject>;
}

const StripeForm = ({ stripeRef }: IStripeFromProps) => {
  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    if (stripeRef.current) {
      stripeRef.current.elements = elements;
      stripeRef.current.stripe = stripe;
    }
  }, [stripeRef.current, elements, stripe]);

  return <PaymentElement options={{ layout: 'tabs' }} />;
};

interface ICheckoutFormProps {
  paymentGateway: PaymentGateway;
  setPaymentGateway: Dispatch<SetStateAction<PaymentGateway>>;
  checkoutRef: RefObject<IStripeRefObject>;
  coupon?: ICoupon;
}

const CheckoutForm = ({
  paymentGateway,
  setPaymentGateway,
  checkoutRef,
  coupon,
}: ICheckoutFormProps) => {
  const { cartProducts, currency } = useGetCartProducts();

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

  return (
    <div className={styles.container}>
      <div className={styles.orderDetails}>
        <h2>Order Details</h2>
        <div className={styles.products}>
          {cartProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>

        <Card classes={{ wrapper: styles.cartTotal }}>
          <h3>Total Price</h3>
          <div className={styles.details}>
            <div className={styles.text}>
              <label>Subtotal</label>
              <span>
                {currency && numberToCurrency(currency).format(totalPrice)}
              </span>
            </div>
            <div className={styles.text}>
              <label>Promo discount</label>
              <span>
                {currency && numberToCurrency(currency).format(couponDiscount)}
              </span>
            </div>
            <div className={styles.divider} />
            <div className={styles.text}>
              <label>Total</label>
              <span>
                {currency &&
                  numberToCurrency(currency).format(
                    totalPrice - couponDiscount
                  )}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card classes={{ wrapper: styles.checkout }}>
        <h3>Pay with</h3>
        <RadioGroup
          value={paymentGateway}
          onChange={({ target }) =>
            setPaymentGateway(target.value as PaymentGateway)
          }
          sx={{ width: '100%' }}
        >
          <FormControlLabel
            value={PaymentGateway.stripe}
            control={<Radio />}
            label="Stripe"
          />
          <Collapse in={paymentGateway === PaymentGateway.stripe}>
            <div className={styles.stripeForm}>
              <Elements
                stripe={stripePromise}
                options={{
                  mode: 'payment',
                  amount: totalPrice * 100,
                  currency: currency?.toLowerCase(),
                  appearance: { theme: 'stripe' },
                }}
              >
                <StripeForm stripeRef={checkoutRef} />
              </Elements>
            </div>
          </Collapse>
          <FormControlLabel
            value={PaymentGateway.other}
            control={<Radio />}
            label="Other Payment method"
          />
        </RadioGroup>
      </Card>
    </div>
  );
};

export default CheckoutForm;
