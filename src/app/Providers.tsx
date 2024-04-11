'use client';

import type { PropsWithChildren } from 'react';
import { StyledEngineProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';

import NextAppDirEmotionCacheProvider from './emotion-cache';

const Providers = ({ children }: PropsWithChildren) => (
  <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
      </SnackbarProvider>
    </Provider>
  </NextAppDirEmotionCacheProvider>
);

export default Providers;
