import { fType, IBaseUIProps } from '@/types';

export interface IVideoModalProps extends IBaseUIProps {
  url: string;
  open: boolean;
  onClose: fType;
}
