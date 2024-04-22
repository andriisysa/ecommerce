import { notFound } from 'next/navigation';

import CoursePage from '@/components/Course';
import { IPagination } from '@/types/pagenation.types';
import { IProduct } from '@/types/product.types';
import request from '@/utils/fetch';

export const revalidate =
  process.env.NODE_ENV === 'development' ? 0 : 12 * 60 * 60;

interface IPage {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const productsData = await request<IPagination<IProduct>>(`/api/products/fe`);

  return (
    productsData?.docs.map((product) => ({
      slug: product.slug,
    })) || []
  );
}

const Page = async ({ params: { slug } }: IPage) => {
  const product = await request<IProduct>(`/api/products/fe/${slug}`);

  if (!product) return notFound();

  return <CoursePage product={product} />;
};

export default Page;
