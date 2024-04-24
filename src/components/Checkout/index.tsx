'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import cn from 'classnames';

import useGetCartProducts from '@/hooks/useGetCartProducts';
import { PaymentGateway } from '@/types/order.types';
import { isEmail, isRequired } from '@/utils/validate';
import { PAGE_COURSES } from '@/routes';

import Button from '../common/Button';
import CheckoutForm, { IStripeRefObject } from './CheckoutForm';
import styles from './styles.module.scss';
import UserForm, { IUserData, IUserDataError } from './UserForm';

const CheckoutPage = () => {
  const [step, setStep] = useState(2);

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

  const checkoutRef = useRef<IStripeRefObject>({
    elements: null,
    stripe: null,
  });

  const { cartProducts, cartItemCount } = useGetCartProducts();

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
      if (paymentGateway === PaymentGateway.stripe) {
        // stripe payment
        const elements = checkoutRef.current.elements;
        const stripe = checkoutRef.current.stripe;

        if (elements === null) {
          return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
          return;
        }
      } else {
        // other payment
      }

      setIsLoading(false);
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
            clearErrors={() => setUserDataErrors({})}
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
      </div>
    </div>
  );
};

export default CheckoutPage;
