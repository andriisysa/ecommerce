import CoursesPage from '@/components/Courses';

interface IPage {
  searchParams: {
    [key: string]: string;
  };
}
const Page = ({ searchParams }: IPage) => {
  return <CoursesPage searchParams={searchParams} />;
};

export default Page;
