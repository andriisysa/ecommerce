'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DeleteForever } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import Accordion from '@/components/common/Accordion';
import Counter from '@/components/common/Counter';
import {
  DiscountRuleType,
  DiscountType,
  ICartProduct,
} from '@/types/product.types';
import { addToCart, removeProductFromCart } from '@/redux/slices/app';
import { numberToCurrency } from '@/utils';

import styles from './styles.module.scss';

interface IProduct extends ICartProduct {
  totalPrice: number;
  totalItems: number;
  productDiscount: number;
}

interface IProps {
  product: IProduct;
}

const CartProduct = ({ product }: IProps) => {
  const {
    name,
    items,
    image,
    totalPrice,
    discount,
    productDiscount,
    currency,
  } = product;

  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      title={
        <div className={styles.container}>
          <div className={styles.image}>
            <Image src={image.url} width={80} height={60} alt={name} />
            <span>{name}</span>
          </div>
          <div className={styles.priceDetails}>
            <div className={styles.priceItem}>
              <label>Price</label>
              <span>{numberToCurrency(currency).format(totalPrice)}</span>
            </div>
            <div className={styles.priceItem}>
              <label>Discount</label>
              <span>
                {discount.amount
                  ? numberToCurrency(currency).format(productDiscount)
                  : 'Not available'}
              </span>
            </div>
            <div className={styles.priceItem}>
              <label>SubTotal</label>
              <span>
                {numberToCurrency(currency).format(
                  totalPrice - productDiscount
                )}
              </span>
            </div>
            <IconButton
              color="error"
              onClick={(e) => {
                if (e.stopPropagation) e.stopPropagation();

                dispatch(removeProductFromCart(product));
              }}
            >
              <DeleteForever />
            </IconButton>
          </div>
        </div>
      }
      expanded={expanded}
      onChange={() => setExpanded((expanded) => !expanded)}
    >
      <div className={styles.details}>
        {discount.amount && discount.rule_amount && (
          <h5>
            You can get{' '}
            {discount.type === DiscountType.fixed
              ? numberToCurrency(currency).format(discount.amount)
              : `${discount.amount}%`}{' '}
            discount if you purchase more than{' '}
            {discount.rule_type === DiscountRuleType.amount
              ? numberToCurrency(currency).format(discount.rule_amount)
              : `${discount.rule_amount} products`}
          </h5>
        )}
        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <span className={styles.name}>
                {format(new Date(item.from), 'EEEE')} - {item.name}
              </span>
              <div className={styles.description}>
                <div className={styles.counterWrapper}>
                  <Counter
                    value={item.count || 0}
                    min={1}
                    max={item.stoke}
                    onChange={(count: number) => {
                      dispatch(
                        addToCart({
                          ...product,
                          items: items.map((i) =>
                            i.id === item.id ? { ...item, count } : i
                          ),
                        })
                      );
                    }}
                  />
                </div>
                <span>{`${item.stoke} in stoke`}</span>
                <span>{numberToCurrency(currency).format(item.price)}</span>

                <IconButton
                  color="error"
                  onClick={(e) => {
                    if (e.stopPropagation) e.stopPropagation();

                    dispatch(
                      addToCart({
                        ...product,
                        items: items.filter((i) => i.id !== item.id),
                      })
                    );
                  }}
                >
                  <DeleteForever />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Accordion>
  );
};

export default CartProduct;
