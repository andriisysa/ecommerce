import { notFound } from 'next/navigation';

import Home from '@/components/Home';
import { IHomePageData } from '@/types/staticPages.types';
import request from '@/utils/fetch';

export const revalidate =
  process.env.NODE_ENV === 'development' ? 0 : 12 * 60 * 60;

const Page = async () => {
  const data = await request<IHomePageData>('/api/globals/home?depth=2');

  if (data === undefined) {
    return notFound();
  }

  return <Home data={data} />;
};

export default Page;
