import { IBaseUIProps } from '@/types';

export interface ILinearProgressProps extends IBaseUIProps {
  progress?: number;
  total?: number;
  completion?: number;
  showText?: boolean;
  textPostion?: 'start' | 'end';
  showLabel?: boolean;
}
