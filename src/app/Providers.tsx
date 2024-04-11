'use client';

import type { PropsWithChildren } from 'react';
import { StyledEngineProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';

import { store } from '@/redux/store';

const Providers = ({ children }: PropsWithChildren) => (
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
);

export default Providers;
