import { IImage } from '.';
import { IDoc } from './doc.types';
import { IProductTag } from './productTags.types';

export interface IVenue extends IDoc {
  id: string;
  address: string;
  lng: number;
  lat: number;
  phone: string;
  email: string;
}

export interface IDiscount {
  type: string;
  amount: number;
  rule_type: string;
  rule_amount: number;
}

export interface IProductItem {
  id: string;
  name: string;
  price: number;
  from: string;
  to: string;
  stoke: 2;
}

export interface IProduct extends IDoc {
  id: string;
  name: string;
  description1: string;
  description2: string;
  venue: IVenue;
  currency: string;
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
