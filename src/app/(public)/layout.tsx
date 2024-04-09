'use client';

import { type PropsWithChildren } from 'react';

import PublicLayout from '@/layouts/public';

const Layout = ({ children }: PropsWithChildren) => {
  return <PublicLayout>{children}</PublicLayout>;
};

export default Layout;
