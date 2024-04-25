import OrderPage from '@/components/Order';
import { IOtherPaymentMethod } from '@/types/order.types';
import request, { fetchOptions } from '@/utils/fetch';

interface IPage {
  params: {
    id: string;
  };
}

const Page = async ({ params: { id } }: IPage) => {
  const otherPaymentMethods = await request<IOtherPaymentMethod[]>(
    `/api/tenants/other-payment-methods`,
    fetchOptions()
  );

  return <OrderPage otherPaymentMethods={otherPaymentMethods || []} id={id} />;
};

export default Page;
