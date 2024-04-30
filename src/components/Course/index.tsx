'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

import { ICartItem } from '@/types/product.types';
import { useGetProductQuery } from '@/redux/apis/productsApi';
import { addToCart } from '@/redux/slices/app';
import { PAGE_COURSES } from '@/routes';

import Button from '../common/Button';
import Preloader from '../common/Preloader';
import CourseContent from './CourseContent';
import styles from './styles.module.scss';

interface IProps {
  slug: string;
}

const CoursePage = ({ slug }: IProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const { data: product, isLoading } = useGetProductQuery({ slug });

  const onAddToCart = () => {
    if (cartItems.length === 0) {
      return enqueueSnackbar('Please select course first!', {
        variant: 'error',
      });
    }

    if (product) {
      dispatch(addToCart({ ...product, items: cartItems }));
      enqueueSnackbar('Course added to Cart!', { variant: 'success' });
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.notfound}>
            <h2>
              Not found Course.
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
        <CourseContent
          product={product}
          cartItems={cartItems}
          setCartItems={setCartItems}
          addToCartBtn={<Button text="Add To Cart" onClick={onAddToCart} />}
        />
      </div>
    </div>
  );
};

export default CoursePage;
