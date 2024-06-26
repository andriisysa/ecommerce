import { ICustomer } from './customer.types';
import { IDoc } from './doc.types';
import { Currency, ICartProduct } from './product.types';

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

export interface IOrderProduct extends ICartProduct {
  totalPrice: number;
  totalItems: number;
  productDiscount: number;
}

export interface IOrder extends IDoc {
  id: string;
  orderNumber: string;
  status: OrderStatusType;
  paymentGateway: PaymentGateway;
  totalPrice: number;
  refundAmount: number;
  currency: Currency;
  details: {
    orderNumber: string;
    totalPrice: number;
    couponDiscount: number;
    products: IOrderProduct[];
    paymentGateway: PaymentGateway;
  };
  orderDate: string;
  attendeeName: string;
  attendeeAge: string;
  experience: string;
  paymentIntentId?: string;
  customer: ICustomer;
}

