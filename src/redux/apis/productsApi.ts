import { createApi } from '@reduxjs/toolkit/query/react';

import { IPagination } from '@/types/pagenation.types';
import { IProduct } from '@/types/product.types';

import { fetchAuthQuery } from '../fetch-auth-query';

interface IGetProductsRequest {
  course?: string;
  ageRange?: string;
  location?: string;
  date?: string;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchAuthQuery({ baseUrl: '/api/products' }),
  endpoints: (builder) => ({
    getProducts: builder.query<IPagination<IProduct>, IGetProductsRequest>({
      query: (params) => ({
        url: '/fe',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const { useLazyGetProductsQuery } = productsApi;
