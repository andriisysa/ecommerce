import { IDoc } from './doc.types';

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

export interface IOder extends IDoc {
  id: string;
  orderId: string;
  status: OrderStatusType;
  paymentGateway: PaymentGateway;
  totalPrice: number;
  refundAmount: number;
  details: any;
  orderDate: string;
  attendeeName: string;
  attendeeAge: string;
  experience: string;
  paymentIntentId: string;
}
