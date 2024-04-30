'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

import Modal from '@/components/common/Modal';
import CourseContent from '@/components/Course/CourseContent';
import { ICartItem, IProduct } from '@/types/product.types';
import { addToCart } from '@/redux/slices/app';

interface IProps {
  product?: IProduct;
  setProduct: Dispatch<SetStateAction<IProduct | undefined>>;
}

const BookNowModal = ({ product, setProduct }: IProps) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const onCancel = () => {
    setCartItems([]);
    setProduct(undefined);
  };

  const onAddToCart = () => {
    if (cartItems.length === 0) {
      return enqueueSnackbar('Please select course first!', {
        variant: 'error',
      });
    }

    if (product) {
      dispatch(addToCart({ ...product, items: cartItems }));
      enqueueSnackbar('Course added to Cart!', { variant: 'success' });
      setProduct(undefined);
    }
  };

  return (
    <Modal
      open={!!product}
      onClose={onCancel}
      onAccept={onAddToCart}
      acceptButtonText="Add To Cart"
      isCancelable
      onCancel={onCancel}
      size="large"
      hideCloseIcon
    >
      {product && (
        <CourseContent
          product={product}
          cartItems={cartItems}
          setCartItems={setCartItems}
          isModal
        />
      )}
    </Modal>
  );
};

export default BookNowModal;
