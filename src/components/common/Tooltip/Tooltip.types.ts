import { ReactNode } from 'react';

import { IBaseUIProps } from '@/types';

export interface ITooltipProps extends IBaseUIProps {
  html: ReactNode;
  icon?: ReactNode;
  label?: string;
  disableHoverListener?: boolean;
  open?: boolean;
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
}
