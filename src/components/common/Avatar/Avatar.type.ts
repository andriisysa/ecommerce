import { IBaseUIProps } from '@/types';

export interface IAvartarProps extends IBaseUIProps {
  imgUrl?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  variant?: 'circular' | 'rounded' | 'square';
  icon?: JSX.Element;
  showName?: boolean;
}
