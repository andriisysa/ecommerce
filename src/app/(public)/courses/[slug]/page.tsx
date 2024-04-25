import { notFound } from 'next/navigation';

import CoursePage from '@/components/Course';
import { IProduct } from '@/types/product.types';
import request from '@/utils/fetch';

interface IPage {
  params: {
    slug: string;
  };
}

const Page = async ({ params: { slug } }: IPage) => {
  return <CoursePage slug={slug} />;
};

export default Page;
