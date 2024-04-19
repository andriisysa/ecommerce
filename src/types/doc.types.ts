export type Doc<T> = T & {
  tenant?: string;
  createdAt: string;
  updatedAt: string;
};
