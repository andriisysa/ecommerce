import { DiscountType } from './product.types';

export interface ICoupon {
  id: string;
  code: string;
  discount: {
    type: DiscountType;
    amount: number;
  };
  limit?: number;
  used?: number;
  active: boolean;
  expireDate?: string;
  tenant: string;
}
