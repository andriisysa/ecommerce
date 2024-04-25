'use client';

import Link from 'next/link';

import { IOtherPaymentMethod } from '@/types/order.types';
import { useGetOrderQuery } from '@/redux/apis/productsApi';
import { PAGE_COURSES } from '@/routes';

import Preloader from '../common/Preloader';
import styles from './styles.module.scss';

interface IProps {
  otherPaymentMethods: IOtherPaymentMethod[];
  id: string;
}

const OrderPage = ({ otherPaymentMethods, id }: IProps) => {
  const { data: order, isLoading } = useGetOrderQuery({ id });

  if (isLoading) {
    return <Preloader />;
  }

  if (!order) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.notfound}>
            <h2>
              Not found Order.
              <Link href={PAGE_COURSES}>Explore courses?</Link>
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.cartContent}></div>
      </div>
    </div>
  );
};

export default OrderPage;
