import { createApi } from '@reduxjs/toolkit/query/react';

import { ICoupon } from '@/types/coupon.types';

import { fetchAuthQuery } from '../fetch-auth-query';

export const couponApi = createApi({
  reducerPath: 'couponApi',
  baseQuery: fetchAuthQuery({ baseUrl: '/api/coupons' }),
  endpoints: (builder) => ({
    verifyCoupon: builder.mutation<ICoupon, { couponCode: string }>({
      query: (body) => ({
        url: '/verify',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useVerifyCouponMutation } = couponApi;
