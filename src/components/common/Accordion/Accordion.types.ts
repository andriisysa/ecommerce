import { ReactNode } from 'react';

import { IBaseUIProps } from '@/types';

export interface IAccordionProps extends IBaseUIProps {
  title: string | ReactNode;
  expanded: boolean;
}
