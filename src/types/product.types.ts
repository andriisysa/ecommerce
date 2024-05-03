import { IImage } from '.';
import { IDoc } from './doc.types';
import { IProductTag } from './productTags.types';

export enum Currency {
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
}

export enum DiscountType {
  percent = 'percent',
  fixed = 'fixed',
}

export enum DiscountRuleType {
  count = 'count',
  amount = 'amount',
}

export interface IVenue extends IDoc {
  id: string;
  address: string;
  lng: number;
  lat: number;
  phone: string;
  email: string;
}

export interface IDiscount {
  type?: DiscountType;
  amount?: number;
  rule_type?: DiscountRuleType;
  rule_amount?: number;
}

export interface IProductItem {
  id: string;
  name: string;
  price: number;
  from: string;
  to: string;
  stock: number;
}

export interface IProduct extends IDoc {
  id: string;
  name: string;
  description1: string;
  description2: string;
  venue: IVenue;
  currency: Currency;
  discount: IDiscount;
  items: IProductItem[];
  slug: string;
  image: IImage;
  ageRange?: IProductTag;
  course?: IProductTag;
  location?: IProductTag;
  tag?: IProductTag;
  date?: IProductTag;
}

export interface ICartItem extends IProductItem {
  count: number;
}
export interface ICartProduct extends IProduct {
  id: string;
  name: string;
  items: ICartItem[];
}
