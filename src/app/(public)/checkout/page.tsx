import CheckoutPage from '@/components/Checkout';

interface IPage {
  searchParams: {
    [key: string]: string;
  };
}

const Page = ({ searchParams }: IPage) => {
  return <CheckoutPage couponCode={searchParams.couponCode} />;
};

export default Page;
