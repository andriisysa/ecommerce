import CheckoutPage from '@/components/Checkout';

interface IPage {
  searchParams: {
    [key: string]: string;
  };
}

const Page = ({ searchParams }: IPage) => {
  return (
    <CheckoutPage
      payment_intent_client_secret={searchParams.payment_intent_client_secret}
    />
  );
};

export default Page;
