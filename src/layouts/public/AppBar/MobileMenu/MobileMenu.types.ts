import { RefObject } from 'react';

import { fType, IBaseUIProps } from '@/types';

export interface IMobileMenuProps extends IBaseUIProps {
  anchorRef: RefObject<HTMLElement>;
  open: boolean;
  onClose: fType;
  onMenuSelect: fType;
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
