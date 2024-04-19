interface IPage {
  params: {
    slug: string;
  };
}
const Page = ({ params: { slug } }: IPage) => {
  return <>Course details page</>;
};

export default Page;
