import { redirect } from 'next/navigation';
import { getPaginatedProducts } from '@/actions';
import { Pagination, Title } from '@/components';
import { ProductGrid } from '@/components';

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const { data, totalPages } = await getPaginatedProducts({
    page: +searchParams.page || 1,
  });
  if (!data.length) redirect('/');

  return (
    <>
      <Title title="Shop" subtitle="Shop page" className="mb-2" />
      <ProductGrid products={data} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
