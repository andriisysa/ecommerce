'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

import Accordion from '@/components/common/Accordion';
import { ICartProduct } from '@/types/product.types';
import { numberToCurrency } from '@/utils';
import { PAGE_COURSES } from '@/routes';

import styles from './styles.module.scss';

interface IProduct extends ICartProduct {
  totalPrice: number;
  totalItems: number;
  productDiscount: number;
}

interface IProps {
  product: IProduct;
}

const Product = ({ product }: IProps) => {
  const {
    name,
    slug,
    items,
    image,
    totalPrice,
    discount,
    productDiscount,
    currency,
  } = product;

  const { push } = useRouter();

  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      title={
        <div className={styles.container}>
          <div
            className={styles.image}
            onClick={(e) => {
              if (e.stopPropagation) e.stopPropagation();
              push(`${PAGE_COURSES}/${slug}`);
            }}
          >
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
          </div>
        </div>
      }
      expanded={expanded}
      onChange={() => setExpanded((expanded) => !expanded)}
    >
      <div className={styles.details}>
        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              <span className={styles.name}>
                {format(new Date(item.from), 'EEEE')} - {item.name}
              </span>
              <div className={styles.description}>
                <span>{numberToCurrency(currency).format(item.price)}</span>
                <span> x </span>
                <span>{item.count}</span>
                <span>
                  {numberToCurrency(currency).format(item.price * item.count)}
                </span>
              </div>
            </div>
          ))}
          {productDiscount ? (
            <div className={styles.discount}>
              <span>Discount</span>
              <span>{numberToCurrency(currency).format(productDiscount)}</span>
            </div>
          ) : undefined}
        </div>
      </div>
    </Accordion>
  );
};

export default Product;
