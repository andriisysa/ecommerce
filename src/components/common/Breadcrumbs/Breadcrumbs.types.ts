import { IBaseUIProps } from '@/types';

export interface IBreadcrumbsItem {
  label: string;
  link?: string;
}

export interface IBreadcrumbsProps extends IBaseUIProps {
  items: IBreadcrumbsItem[];
}
