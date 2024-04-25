'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowBack } from '@mui/icons-material';
import { FormHelperText } from '@mui/material';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import useGetCartProducts from '@/hooks/useGetCartProducts';
import { PaymentGateway } from '@/types/order.types';
import {
  useOtherCheckoutMutation,
  useStripeCheckoutMutation,
} from '@/redux/apis/productsApi';
import { clearCart } from '@/redux/slices/app';
import { isEmail, isRequired } from '@/utils/validate';
import { PAGE_COURSES, PAGE_ORDERS } from '@/routes';

import Button from '../common/Button';
import CheckoutForm, { IStripeRefObject } from './CheckoutForm';
import styles from './styles.module.scss';
import UserForm, { IUserData, IUserDataError } from './UserForm';

const CheckoutPage = () => {
  const { push } = useRouter();

  const [step, setStep] = useState(1);

  const [userData, setUserData] = useState<IUserData>({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    email: '',
    phone: '',
    attendeeName: '',
    attendeeAge: '',
    experience: '',
    orderNote: '',
  });

  const [userDataErrors, setUserDataErrors] = useState<IUserDataError>({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState(PaymentGateway.stripe);
  const [requestError, setRequestError] = useState('');

  const checkoutRef = useRef<IStripeRefObject>({
    elements: null,
    stripe: null,
  });

  const dispatch = useDispatch();

  const { cartProducts, cartItemCount } = useGetCartProducts();
  const [stripeCheckout] = useStripeCheckoutMutation();
  const [otherCheckout] = useOtherCheckoutMutation();

  const isFirstStep = () => step === 1;

  const prevStep = () => {
    if (isFirstStep()) return;

    setStep(step - 1);
  };

  const nextStep = async () => {
    if (!isValidate()) {
      return;
    }

    if (step === 1) {
      setStep(step + 1);
      return;
    }

    if (step === 2) {
      setRequestError('');

      if (paymentGateway === PaymentGateway.stripe) {
        // stripe payment
        const elements = checkoutRef.current.elements;
        const stripe = checkoutRef.current.stripe;

        if (!elements || !stripe) {
          return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
          return;
        }

        setIsLoading(true);

        try {
          const data = await stripeCheckout({
            cartProducts,
            userData,
          }).unwrap();

          const { paymentIntent, error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret: String(data.paymentIntent.client_secret),
            confirmParams: {
              return_url: `${process.env.NEXT_PUBLIC_WEB_URL}/checkout`,
            },
            redirect: 'if_required',
          });

          if (error?.message) {
            console.log('stripe confirm error ===>', error);
            setRequestError(error.message);
            setIsLoading(false);
            return;
          }

          switch (paymentIntent?.status) {
            case 'succeeded':
              dispatch(clearCart());
              push(`${PAGE_ORDERS}/${data.order.id}`);
              return;

            case 'processing':
              dispatch(clearCart());
              push(`${PAGE_ORDERS}/${data.order.id}`);
              break;

            case 'requires_payment_method':
              setRequestError(
                'Payment failed. Please try another payment method.'
              );
              break;

            default:
              setRequestError('Something went wrong.');
              break;
          }
        } catch (error: any) {
          const errorMsg = error.data
            ? error.data.errors[0].message
            : error.message;
          setRequestError(errorMsg);
        }

        setIsLoading(false);
      } else {
        // other payment
        setIsLoading(true);
        try {
          const { order } = await otherCheckout({
            cartProducts,
            userData,
          }).unwrap();

          dispatch(clearCart());
          push(`${PAGE_ORDERS}/${order.id}`);
        } catch (error: any) {
          const errorMsg = error.data
            ? error.data.errors[0].message
            : error.message;
          setRequestError(errorMsg);
        }
        setIsLoading(false);
      }
    }
  };

  const isValidate = () => {
    switch (step) {
      case 1:
        const errors: IUserDataError = {
          firstName: isRequired(userData.firstName),
          lastName: isRequired(userData.lastName),
          address1: isRequired(userData.address1),
          city: isRequired(userData.city),
          state: isRequired(userData.state),
          country: isRequired(userData.country),
          postalCode: isRequired(userData.postalCode),
          email: isEmail(userData.email),
          phone: isRequired(userData.phone),
          attendeeName: isRequired(userData.attendeeName),
          attendeeAge: isRequired(userData.attendeeAge),
        };

        setUserDataErrors(errors);

        return Object.values(errors).filter((str) => str).length === 0;
      default:
        return true;
    }
  };

  if (cartItemCount === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.emptyCart}>
            <h3>
              You don&apos;t have any items to checkout.
              <Link href={PAGE_COURSES}>Explore courses?</Link>
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {step === 1 && (
          <UserForm
            userData={userData}
            setUserData={setUserData}
            errors={userDataErrors}
            clearErrors={() => {
              setUserDataErrors({});
              setRequestError('');
            }}
          />
        )}
        {step === 2 && (
          <CheckoutForm
            paymentGateway={paymentGateway}
            setPaymentGateway={setPaymentGateway}
            checkoutRef={checkoutRef}
          />
        )}

        <div className={styles.actionGroup}>
          <Button
            classes={{
              root: cn(styles.finishBtn),
            }}
            text={isFirstStep() ? 'Continue' : 'Checkout'}
            onClick={nextStep}
            loading={isLoading}
          />
          {!isFirstStep() && (
            <Button
              classes={{ root: styles.backBtn }}
              text="Back"
              iconPosition="start"
              variant="outlined"
              icon={<ArrowBack />}
              onClick={prevStep}
            />
          )}
        </div>

        {requestError ? (
          <FormHelperText
            error
            sx={{
              width: '100%',
              textAlign: 'end',
              pr: 2,
              mt: 2,
            }}
          >
            {requestError}
          </FormHelperText>
        ) : undefined}
      </div>
    </div>
  );
};

export default CheckoutPage;
