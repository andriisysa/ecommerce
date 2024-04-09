import { ReactNode } from 'react';

import { IBaseUIProps } from '@/types';

export interface IOutLinedInputProps extends IBaseUIProps {
  name: string;
  value: string;
  type: 'password' | 'text' | 'email' | 'tel';
  multiline?: boolean;
  placeholder?: string;
  inputProps?: object;
  required?: boolean;
  error?: string;
  endAdornment?: ReactNode;
  isShowPassword?: boolean;
  rows?: number;
}
