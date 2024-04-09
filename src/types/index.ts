import { type PropsWithChildren } from 'react';

export declare type fType = (...args: any) => void;

export interface IBaseUIProps extends PropsWithChildren {
  classes?: any;
  onClick?: fType;
  disabled?: boolean;
  onChange?: fType;
}
