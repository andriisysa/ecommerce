'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import { FormHelperText } from '@mui/material';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import useGetCartProducts from '@/hooks/useGetCartProducts';
import { IResponseError } from '@/types/error.types';
import { PaymentGateway } from '@/types/order.types';
import { useStripeCheckoutMutation } from '@/redux/apis/ordersApi';
import { clearCart } from '@/redux/slices/app';
import { isEmail, isRequired } from '@/utils/validate';
import { PAGE_COURSES } from '@/routes';

import Button from '../common/Button';
import CheckoutDone, { PaymentStatus } from './CheckoutDone';
import CheckoutForm, { IStripeRefObject } from './CheckoutForm';
import styles from './styles.module.scss';
import UserForm, { IUserData, IUserDataError } from './UserForm';

interface IProps {
  payment_intent_client_secret?: string;
}

const CheckoutPage = ({ payment_intent_client_secret }: IProps) => {
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
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | undefined>(
    undefined
  );
  const [requestError, setRequestError] = useState('');

  const checkoutRef = useRef<IStripeRefObject>({
    elements: null,
    stripe: null,
  });

  const dispatch = useDispatch();

  const { cartProducts, cartItemCount } = useGetCartProducts();
  const [stripeCheckout] = useStripeCheckoutMutation();

  const isFirstStep = () => step === 1;
  const isLastStep = () => step == 3;

  const prevStep = () => {
    if (isFirstStep()) return;

    setStep(step - 1);
  };

  const nextStep = async () => {
    if (!isValidate()) {
      return;
    }

    if (step === 2) {
      setIsLoading(true);
      setRequestError('');

      if (paymentGateway === PaymentGateway.stripe) {
        // stripe payment
        const elements = checkoutRef.current.elements;
        const stripe = checkoutRef.current.stripe;

        if (!elements || !stripe) {
          setIsLoading(false);
          return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
          setIsLoading(false);
          return;
        }

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
              setPaymentStatus(PaymentStatus.succeeded);
              break;

            case 'processing':
              dispatch(clearCart());
              setPaymentStatus(PaymentStatus.processing);
              break;

            case 'requires_payment_method':
              setIsLoading(false);
              setRequestError(
                'Payment failed. Please try another payment method.'
              );
              return;

            default:
              setRequestError('Something went wrong.');
              setIsLoading(false);
              return;
          }
        } catch (error: any) {
          console.log('error ===>', error);
          const errorMsg = error.data
            ? error.data.errors[0].message
            : error.message;
          setRequestError(errorMsg);
          setIsLoading(false);
          return;
        }
      } else {
        // other payment
      }

      setIsLoading(false);
    }

    if (step === 3) {
      return;
    }

    setStep(step + 1);
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

  if (cartItemCount === 0 && step === 1) {
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

        {step === 3 && paymentStatus && (
          <CheckoutDone
            paymentGateway={paymentGateway}
            paymentStatus={paymentStatus}
            userData={userData}
          />
        )}

        <div className={styles.actionGroup}>
          <Button
            classes={{
              root: cn(styles.finishBtn),
            }}
            text={
              isFirstStep() ? 'Continue' : isLastStep() ? 'Done' : 'Checkout'
            }
            onClick={nextStep}
            loading={isLoading}
          />
          {!isFirstStep() && !isLastStep() && (
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
