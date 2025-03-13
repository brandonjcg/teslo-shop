export const revalidate = 60;

import { redirect } from 'next/navigation';

import { ProductGrid } from '@/components/products/ProductGrid';
import { Title } from '@/components/ui/Title';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { getPaginatedProducts } from '@/actions/products/products-pagination';

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
