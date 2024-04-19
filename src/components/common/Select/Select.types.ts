import { IBaseUIProps } from '@/types';

export interface ISelectProps extends IBaseUIProps {
  label?: string;
  isLoading?: boolean;
  items: ISelectItem[];
  value?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export declare interface ISelectItem {
  label: string;
  value: string;
}
