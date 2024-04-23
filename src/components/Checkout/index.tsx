'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import cn from 'classnames';

import useGetCartProducts from '@/hooks/useGetCartProducts';
import { PAGE_COURSES } from '@/routes';

import Button from '../common/Button';
import styles from './styles.module.scss';
import UserForm, { IUserData, IUserDataError } from './UserForm';

const CheckoutPage = () => {
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

  const [errors, setErrors] = useState<IUserDataError>({});

  const { cartProducts, cartItemCount, currency } = useGetCartProducts();

  const isFirstStep = () => step === 1;
  const isLastStep = () => step == 3;

  const prevStep = () => {
    if (isFirstStep()) return;

    setStep(step - 1);
  };

  const nextStep = () => {
    if (isLastStep()) {
      return;
    }

    setStep(step + 1);
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
            errors={errors}
          />
        )}
        <div className={styles.actionGroup}>
          <Button
            classes={{
              root: cn(styles.finishBtn),
            }}
            text={
              isFirstStep() ? 'Continue' : isLastStep() ? 'Finish' : 'Checkout'
            }
            onClick={nextStep}
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
