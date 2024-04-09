import { IBaseUIProps } from '@/types';

export interface ITooltipContainerProps extends IBaseUIProps {
  text: string;
  arrow?: 'top' | 'bottom' | 'left' | 'right';
}
