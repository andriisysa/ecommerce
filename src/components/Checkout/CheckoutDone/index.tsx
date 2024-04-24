'use client';

import { useEffect, useState } from 'react';
import cn from 'classnames';

import { PaymentGateway } from '@/types/order.types';

import { IUserData } from '../UserForm';
import styles from './styles.module.scss';

export enum PaymentStatus {
  succeeded = 'succeeded',
  processing = 'processing',
}

interface IProps {
  paymentGateway: PaymentGateway;
  paymentStatus: PaymentStatus;
  userData: IUserData;
}

const CheckoutDone = ({ paymentGateway, paymentStatus, userData }: IProps) => {
  console.log('====>', userData);
  return (
    <div className={styles.container}>
      {paymentGateway}, {paymentStatus}
    </div>
  );
};

export default CheckoutDone;
