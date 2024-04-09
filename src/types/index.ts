import { type PropsWithChildren } from 'react';

export declare type fType = (...args: any) => void;

export interface IBaseUIProps extends PropsWithChildren {
  classes?: any;
  onClick?: fType;
  disabled?: boolean;
  onChange?: fType;
}

interface CMS_Image {
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  url: string;
}
export interface IImage extends CMS_Image {
  id: string;
  createdAt: string;
  updatedAt: string;

  sizes: {
    thumbnail: CMS_Image;
    card: CMS_Image;
    tablet: CMS_Image;
  };
}
