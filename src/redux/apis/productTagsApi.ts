import { createApi } from '@reduxjs/toolkit/query/react';

import { IPagination } from '@/types/pagenation.types';
import { IProductTag } from '@/types/productTags.types';

import { fetchAuthQuery } from '../fetch-auth-query';

export const productTagsApi = createApi({
  reducerPath: 'productTagsApi',
  baseQuery: fetchAuthQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getCourses: builder.query<IPagination<IProductTag>, void>({
      query: () => ({
        url: '/courses?limit=0',
        method: 'GET',
      }),
    }),
    getTags: builder.query<IPagination<IProductTag>, void>({
      query: () => ({
        url: '/tags?limit=0',
        method: 'GET',
      }),
    }),
    getDates: builder.query<IPagination<IProductTag>, void>({
      query: () => ({
        url: '/dates?limit=0',
        method: 'GET',
      }),
    }),
    getLocations: builder.query<IPagination<IProductTag>, void>({
      query: () => ({
        url: '/locations?limit=0',
        method: 'GET',
      }),
    }),
    getAgeRanges: builder.query<IPagination<IProductTag>, void>({
      query: () => ({
        url: '/ageRanges?limit=0',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetTagsQuery,
  useGetDatesQuery,
  useGetLocationsQuery,
  useGetAgeRangesQuery,
} = productTagsApi;
