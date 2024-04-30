import { createApi } from '@reduxjs/toolkit/query/react';
import { type PaymentIntent } from '@stripe/stripe-js';

import { IUserData } from '@/components/Checkout/UserForm';
import { IOrder } from '@/types/order.types';
import { IPagination } from '@/types/pagenation.types';
import { ICartProduct, IProduct } from '@/types/product.types';

import { fetchAuthQuery } from '../fetch-auth-query';

interface IGetProductsRequest {
  course?: string;
  ageRange?: string;
  location?: string;
  date?: string;
}

interface ICheckoutRequest {
  cartProducts: ICartProduct[];
  userData: IUserData;
  couponCode?: string;
}

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchAuthQuery({ baseUrl: '/api' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<IPagination<IProduct>, IGetProductsRequest>({
      query: (params) => ({
        url: '/products/fe',
        method: 'GET',
        params,
      }),
      providesTags: ['Products'],
    }),
    getProduct: builder.query<IProduct, { slug: string }>({
      query: ({ slug }) => ({
        url: `/products/fe/${slug}`,
        method: 'GET',
      }),
      providesTags: ['Products'],
    }),

    getOrder: builder.query<IOrder, { id: string }>({
      query: ({ id }) => ({
        url: `/orders/${id}`,
        method: 'GET',
      }),
    }),
    stripeCheckout: builder.mutation<
      { order: IOrder; paymentIntent: PaymentIntent },
      ICheckoutRequest
    >({
      query: (body) => ({
        url: '/orders/stripe',
        method: 'post',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    otherCheckout: builder.mutation<{ order: IOrder }, ICheckoutRequest>({
      query: (body) => ({
        url: '/orders/other',
        method: 'post',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useLazyGetProductsQuery,
  useGetProductQuery,
  useStripeCheckoutMutation,
  useOtherCheckoutMutation,
  useGetOrderQuery,
} = productsApi;
