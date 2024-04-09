import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.scss';

import classNames from 'classnames';

import Providers from './Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'CodeKids',
    template: `%s - CodeKids`,
  },
  description: '',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en-US">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>

      <body className={classNames(inter.className, 'body')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
