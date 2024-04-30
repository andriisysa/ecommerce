import { notFound } from 'next/navigation';

import FAQPage from '@/components/FAQ';
import { IFAQData } from '@/types/staticPages.types';
import request from '@/utils/fetch';

export const revalidate =
  process.env.NODE_ENV === 'development' ? 0 : 12 * 60 * 60;

const Page = async () => {
  const faqData = await request<IFAQData>('/api/globals/faq');

  if (faqData === undefined) {
    return notFound();
  }

  const tags = faqData.faqs.map((faq) => ({
    label: faq.subject,
    value: faq.id,
  }));

  return <FAQPage faqs={faqData.faqs} tags={tags} />;
};

export default Page;
