import { ReactNode } from 'react';

import { IBaseUIProps } from '@/types';

export interface ICardProps extends IBaseUIProps {
  title?: string;
  titleElm?: ReactNode;
  green?: boolean;
  showCheckIcon?: boolean;
}
