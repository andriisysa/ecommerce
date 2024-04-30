'use client';

import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';
import Image from 'next/image';
import {
  Divider,
  NoSsr,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import cn from 'classnames';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import {
  DiscountRuleType,
  DiscountType,
  ICartItem,
  IProduct,
} from '@/types/product.types';
import { cartAvailableDiffHours } from '@/redux/slices/app';
import { RootState } from '@/redux/store';
import { numberToCurrency } from '@/utils';
import { diffFromNow } from '@/utils/date';

import Counter from '../common/Counter';
import styles from './styles.module.scss';

interface IProps {
  product: IProduct;
  cartItems: ICartItem[];
  setCartItems: Dispatch<SetStateAction<ICartItem[]>>;
  addToCartBtn?: ReactNode;
  isModal?: boolean;
}

const CourseContent = ({
  product,
  addToCartBtn,
  cartItems,
  setCartItems,
  isModal = false,
}: IProps) => {
  const {
    name,
    image,
    description1,
    description2,
    discount,
    items,
    currency,
    venue,
  } = product;

  const cartProducts = useSelector(
    (state: RootState) => state.app.cartProducts
  );

  useEffect(() => {
    if (product) {
      const cartProduct = cartProducts.find((cp) => cp.id === product.id);
      if (cartProduct) {
        setCartItems(cartProduct.items);
      }
    }
  }, [product, cartProducts, setCartItems]);

  return (
    <div className={styles.productContent}>
      <div className={styles.left}>
        <div className={cn(styles.image, { [styles.modal]: isModal })}>
          <Image
            src={image.url}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div
          className={styles.description1}
          dangerouslySetInnerHTML={{ __html: description1 }}
        />

        {discount.amount && discount.rule_amount && (
          <span className={styles.discount}>
            You can get{' '}
            {discount.type === DiscountType.fixed
              ? numberToCurrency(currency).format(discount.amount)
              : `${discount.amount}%`}{' '}
            discount if you purchase more than{' '}
            {discount.rule_type === DiscountRuleType.amount
              ? numberToCurrency(currency).format(discount.rule_amount)
              : `${discount.rule_amount} products`}
          </span>
        )}

        <span className={styles.productName}>{name} Timetable</span>

        <NoSsr>
          <Table className={styles.table}>
            <TableHead className={styles.thead}>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Course</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(({ id, from, to, name, stoke }) => (
                <TableRow
                  key={id}
                  className={cn({
                    [styles.textThrough]:
                      diffFromNow(from) < cartAvailableDiffHours || stoke < 1,
                  })}
                >
                  <TableCell>{new Date(from).toDateString()}</TableCell>
                  <TableCell>
                    {new Date(from).toLocaleTimeString()} -{' '}
                    {new Date(to).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>{name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </NoSsr>

        {description2 && (
          <div
            className={styles.description1}
            dangerouslySetInnerHTML={{ __html: description2 }}
          />
        )}
      </div>
      <div className={styles.right}>
        <h3>Details</h3>
        <NoSsr>
          <Divider sx={{ background: 'black' }} />
          <Stack spacing={2} marginTop={4} className={styles.venue}>
            <Stack spacing={1}>
              <label>ADDRESS</label>
              <span>{venue.address}</span>
            </Stack>
            <Stack spacing={1}>
              <label>PHONE</label>
              <span>{venue.phone}</span>
            </Stack>
            <Stack spacing={1}>
              <label>EMAIL</label>
              <span>{venue.email}</span>
            </Stack>
            {venue.lng && venue.lat ? (
              <iframe
                src={`//maps.google.com/maps?q=${venue.lat},${venue.lng}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className={cn(styles.map, { [styles.modal]: isModal })}
              />
            ) : undefined}
          </Stack>
        </NoSsr>
        <h4>Product Items</h4>
        {discount.amount && discount.rule_amount && (
          <span className={styles.discount}>
            You can get{' '}
            {discount.type === DiscountType.fixed
              ? numberToCurrency(currency).format(discount.amount)
              : `${discount.amount}%`}{' '}
            discount if you purchase more than{' '}
            {discount.rule_type === DiscountRuleType.amount
              ? numberToCurrency(currency).format(discount.rule_amount)
              : `${discount.rule_amount} products`}
          </span>
        )}
        <div className={styles.items}>
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(styles.item, {
                [styles.textThrough]:
                  diffFromNow(item.from) < cartAvailableDiffHours,
              })}
            >
              <div className={styles.counterWrapper}>
                <Counter
                  value={cartItems.find((ci) => ci.id === item.id)?.count || 0}
                  min={0}
                  max={
                    diffFromNow(item.from) < cartAvailableDiffHours
                      ? 0
                      : item.stoke
                  }
                  onChange={(count: number) =>
                    setCartItems((prev) => [
                      ...prev.filter((ci) => ci.id !== item.id),
                      ...(count > 0 ? [{ ...item, count }] : []),
                    ])
                  }
                />
                <span className={styles.itemDescription}>
                  {format(new Date(item.from), 'EEEE')} - {item.name}
                </span>
              </div>
              <span>{`${item.stoke} in stoke`}</span>
              <span>{numberToCurrency(currency).format(item.price)}</span>
            </div>
          ))}
        </div>
        {addToCartBtn}
      </div>
    </div>
  );
};

export default CourseContent;
