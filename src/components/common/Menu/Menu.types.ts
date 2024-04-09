import { ReactNode, RefObject } from 'react';

import { fType, IBaseUIProps } from '@/types';

export interface IMenuItem {
  label: string;
  path?: string;
  icon?: ReactNode;
}

export interface IMenuProps extends IBaseUIProps {
  anchorRef: RefObject<HTMLElement>;
  open: boolean;
  onClose: fType;
  onMenuSelect?: fType;
  items?: IMenuItem[];
  placement?:
    | 'top'
    | 'bottom'
    | 'right'
    | 'left'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end';
}
