import { IBaseUIProps } from '@/types';
import { IFAQ } from '@/types/staticPages.types';

export interface IQaProps extends IBaseUIProps {
  qas: IFAQ[];
  loading?: boolean;
}

export interface IQaImageProps extends IBaseUIProps {
  url: string;
}
