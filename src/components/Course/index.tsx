'use client';

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

import {
  DiscountRuleType,
  DiscountType,
  IProduct,
} from '@/types/product.types';
import { numberToCurrency } from '@/utils';
import { diffFromNow } from '@/utils/date';

import Button from '../common/Button';
import styles from './styles.module.scss';

interface IProps {
  product: IProduct;
}
const CoursePage = ({ product }: IProps) => {
  const {
    image,
    name,
    description1,
    description2,
    discount,
    currency,
    items,
    venue,
  } = product;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.productContent}>
          <div className={styles.left}>
            <div className={styles.image}>
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
                          diffFromNow(from) < 5 || stoke < 1,
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
                    className={styles.map}
                  />
                ) : undefined}
              </Stack>
            </NoSsr>
            <div className={styles.items}>
              {items.map(({ id, name, from, price, stoke }) => (
                <div key={id} className={styles.item}>
                  <div className={styles.counterWrapper}>
                    <span>
                      {format(new Date(from), 'EEEE')} - {name}
                    </span>
                  </div>
                  <span>{`${stoke} in stoke`}</span>
                  <span>{numberToCurrency(currency).format(price)}</span>
                </div>
              ))}
            </div>
            <Button text="Book Now" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
