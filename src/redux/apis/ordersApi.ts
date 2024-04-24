import { createApi } from '@reduxjs/toolkit/query/react';
import { type PaymentIntent } from '@stripe/stripe-js';

import { IUserData } from '@/components/Checkout/UserForm';
import { IOder } from '@/types/order.types';
import { ICartProduct } from '@/types/product.types';

import { fetchAuthQuery } from '../fetch-auth-query';

interface IStripeOrderRequest {
  cartProducts: ICartProduct[];
  userData: IUserData;
}

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchAuthQuery({ baseUrl: '/api/orders' }),
  endpoints: (builder) => ({
    stripeCheckout: builder.mutation<
      { order: IOder; paymentIntent: PaymentIntent },
      IStripeOrderRequest
    >({
      query: (body) => ({
        url: '/stripe',
        method: 'post',
        body,
      }),
    }),
  }),
});

export const { useStripeCheckoutMutation } = ordersApi;
