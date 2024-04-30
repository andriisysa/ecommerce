import { IBaseUIProps } from '@/types';

export declare interface ITag {
  label: string;
  value: string;
}

export interface ITagListProps extends IBaseUIProps {
  tags: ITag[];
  limit?: number;
  selected?: ITag;
  loading?: boolean;
}

export interface ITagListItemProps extends IBaseUIProps {
  item: ITag;
  active: boolean;
}
