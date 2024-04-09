import { IBaseUIProps } from '@/types';

export interface ISwitchProps extends IBaseUIProps {
  checked: boolean;
  label?: string;
  defaultCheck?: boolean;
  required?: boolean;
  error?: string;
}
