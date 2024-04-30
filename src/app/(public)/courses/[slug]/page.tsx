import CoursePage from '@/components/Course';

interface IPage {
  params: {
    slug: string;
  };
}

const Page = async ({ params: { slug } }: IPage) => {
  return <CoursePage slug={slug} />;
};

export default Page;
