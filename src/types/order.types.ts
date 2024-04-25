import { ICustomer } from './customer.types';
import { IDoc } from './doc.types';
import { ICartProduct } from './product.types';

export enum PaymentGateway {
  stripe = 'stripe',
  other = 'other',
}

export enum OrderStatusType {
  processing = 'Processing',
  onHold = 'On Hold',
  error = 'Error',
  refunded = 'Refunded',
}

export interface IOrder extends IDoc {
  id: string;
  orderId: string;
  status: OrderStatusType;
  paymentGateway: PaymentGateway;
  totalPrice: number;
  refundAmount: number;
  details: {
    orderId: string;
    totalPrice: number;
    couponDiscount: number;
    products: ICartProduct[];
    paymentGateway: PaymentGateway;
    customer: ICustomer;
  };
  orderDate: string;
  attendeeName: string;
  attendeeAge: string;
  experience: string;
  paymentIntentId?: string;
  customer: ICustomer;
}

export interface IOtherPaymentMethod {
  id: string;
  name: string;
  bank?: string;
  accountNumber: string;
  sortCode?: string;
}
