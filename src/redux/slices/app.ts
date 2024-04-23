import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ICartProduct } from '@/types/product.types';
import { diffFromNow } from '@/utils/date';

export const cartKey = '@code-keys-cart';
export const cartAvailableDiffHours = 5;

interface IAppState {
  cartProducts: ICartProduct[];
}

const initialState: IAppState = {
  cartProducts: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadCartProducts: (state) => {
      const storedCartProducts = JSON.parse(
        localStorage.getItem(cartKey) || '[]'
      ) as ICartProduct[];

      // validate dates based on cartAvailableDiffHours
      const validCartProducts = storedCartProducts
        .map((product) => ({
          ...product,
          items: product.items.filter(
            (item) => diffFromNow(item.from) >= cartAvailableDiffHours
          ),
        }))
        .filter((product) => product.items.length > 0);

      state.cartProducts = validCartProducts;
      window.localStorage.setItem(cartKey, JSON.stringify(state.cartProducts));
    },
    setCartProducts: (state, { payload }: PayloadAction<ICartProduct[]>) => {
      state.cartProducts = payload;
    },
    addToCart: (state, { payload }: PayloadAction<ICartProduct>) => {
      if (payload.items.length === 0) {
        state.cartProducts = state.cartProducts.filter(
          (p) => p.id !== payload.id
        );
      } else {
        const cartProduct = state.cartProducts.find((p) => p.id === payload.id);
        if (cartProduct) {
          state.cartProducts = state.cartProducts.map((p) =>
            p.id === payload.id ? payload : p
          );
        } else {
          state.cartProducts = [...state.cartProducts, payload];
        }
      }

      window.localStorage.setItem(cartKey, JSON.stringify(state.cartProducts));
    },
    removeProductFromCart: (
      state,
      { payload }: PayloadAction<ICartProduct>
    ) => {
      state.cartProducts = state.cartProducts.filter(
        (p) => p.id !== payload.id
      );
      window.localStorage.setItem(cartKey, JSON.stringify(state.cartProducts));
    },
    clearCart: (state) => {
      state.cartProducts = [];
      window.localStorage.removeItem(cartKey);
    },
  },
});

export const {
  loadCartProducts,
  setCartProducts,
  addToCart,
  removeProductFromCart,
  clearCart,
} = appSlice.actions;

export default appSlice.reducer;
