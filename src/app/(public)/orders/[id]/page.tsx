import OrderPage from '@/components/Order';
import { ITenant } from '@/types/tenant.types';
import request, { fetchOptions } from '@/utils/fetch';

interface IPage {
  params: {
    id: string;
  };
}

const Page = async ({ params: { id } }: IPage) => {
  const tenant = await request<ITenant>(`/api/tenants/info`, fetchOptions());

  return (
    <OrderPage
      otherPaymentMethods={tenant?.otherPaymentMethods || []}
      tenantContact={tenant?.contact}
      id={id}
    />
  );
};

export default Page;
