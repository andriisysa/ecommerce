'use client';

import Link from 'next/link';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

import { IOtherPaymentMethod, PaymentGateway } from '@/types/order.types';
import { useGetOrderQuery } from '@/redux/apis/productsApi';
import { numberToCurrency } from '@/utils';
import { PAGE_COURSES } from '@/routes';

import Product from '../Checkout/CheckoutForm/Product';
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

  const {
    orderId,
    orderDate,
    customer,
    totalPrice,
    paymentGateway,
    details,
    attendeeName,
    attendeeAge,
    currency,
  } = order;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.orderContent}>
          <div className={styles.orderDetails}>
            <h3>Thank you. Your order has been received.</h3>
            <div className={styles.item}>
              <InfoRoundedIcon fontSize="small" />
              <label>Order Number:</label>
              <span>{orderId}</span>
            </div>
            <div className={styles.item}>
              <InfoRoundedIcon fontSize="small" />
              <label>Date:</label>
              <span>{new Date(orderDate).toLocaleDateString()}</span>
            </div>
            <div className={styles.item}>
              <InfoRoundedIcon fontSize="small" />
              <label>Email:</label>
              <span>{customer.email}</span>
            </div>
            <div className={styles.item}>
              <InfoRoundedIcon fontSize="small" />
              <label>Total:</label>
              <span>{numberToCurrency(currency).format(totalPrice)}</span>
            </div>
            <div className={styles.item}>
              <InfoRoundedIcon fontSize="small" />
              <label>Payment method:</label>
              <span>
                {paymentGateway === PaymentGateway.stripe
                  ? 'Stripe'
                  : 'Bank Transfer or Childcare Vouchers'}
              </span>
            </div>

            <span className={styles.reference}>
              Please use your Order ID as the payment reference, and email us on
              info@codekids.org.uk to confirm transfer.
            </span>
          </div>

          {paymentGateway === PaymentGateway.other && (
            <div className={styles.bankDetails}>
              <h3>Our bank details</h3>
              {otherPaymentMethods.map(
                ({ id, name, bank, accountNumber, sortCode }) => (
                  <div key={id} className={styles.details}>
                    <h4>{name}</h4>
                    {bank && (
                      <div className={styles.item}>
                        <InfoRoundedIcon fontSize="small" />
                        <label>Bank:</label>
                        <span>{bank}</span>
                      </div>
                    )}

                    <div className={styles.item}>
                      <InfoRoundedIcon fontSize="small" />
                      <label>Account number:</label>
                      <span>{accountNumber}</span>
                    </div>
                    {sortCode && (
                      <div className={styles.item}>
                        <InfoRoundedIcon fontSize="small" />
                        <label>Sort code:</label>
                        <span>{sortCode}</span>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )}

          <div className={styles.customerDetails}>
            <h3>Order Details</h3>
            {details.products.map((product) => (
              <Product key={product.id} product={product} />
            ))}

            <div className={styles.orderTotal}>
              <div className={styles.details}>
                <div className={styles.text}>
                  <label>Subtotal</label>
                  <span>
                    {currency &&
                      numberToCurrency(currency).format(details.totalPrice)}
                  </span>
                </div>
                <div className={styles.text}>
                  <label>Promo discount</label>
                  <span>
                    {currency &&
                      numberToCurrency(currency).format(details.couponDiscount)}
                  </span>
                </div>
                <div className={styles.divider} />
                <div className={styles.text}>
                  <label>Total</label>
                  <span>
                    {currency && numberToCurrency(currency).format(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.customerDetails}>
            <h3>Customer details</h3>
            <div className={styles.detail}>
              <label>Email:</label>
              <span>{customer.email}</span>
            </div>
            <div className={styles.detail}>
              <label>Phone:</label>
              <span>{customer.phone}</span>
            </div>
            <h4>Billing address</h4>
            <span>{`${customer.country}, ${customer.postalCode}`}</span>
            <span>{`${customer.city}, ${customer.state}`}</span>
            <span>{customer.address1}</span>
            <span>{`${customer.firstName} ${customer.lastName}`}</span>
          </div>

          <div className={styles.customerDetails}>
            <h3>Order extra</h3>
            <div className={styles.detail}>
              <label>Attendee Name:</label>
              <span>{attendeeName}</span>
            </div>
            <div className={styles.detail}>
              <label>Attendee Age:</label>
              <span>{attendeeAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
