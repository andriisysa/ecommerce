import { notFound } from 'next/navigation';

import Home from '@/components/Home';
import { IFAQData, IHomePageData } from '@/types/staticPages.types';
import request from '@/utils/fetch';

export const revalidate =
  process.env.NODE_ENV === 'development' ? 0 : 12 * 60 * 60;

const Page = async () => {
  const data = await request<IHomePageData>('/api/globals/home');
  const faqData = await request<IFAQData>('/api/globals/faq');

  if (data === undefined) {
    return notFound();
  }

  return <Home data={data} faqData={faqData} />;
};

export default Page;
