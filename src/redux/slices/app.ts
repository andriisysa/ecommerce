import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface IAppState {
  init: boolean;
}

const initialState: IAppState = {
  init: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export default appSlice.reducer;
