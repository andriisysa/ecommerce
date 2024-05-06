import { Currency } from './product.types';

export interface IOtherPaymentMethod {
  id: string;
  name: string;
  bank?: string;
  accountNumber: string;
  sortCode?: string;
}

export interface ITenantContact {
  email?: string;
}

export interface ITenant {
  contact?: ITenantContact;
  currency?: Currency;
  otherPaymentMethods?: IOtherPaymentMethod[];
}
