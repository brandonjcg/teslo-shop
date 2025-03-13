export const revalidate = 60;

import { notFound, redirect } from 'next/navigation';
import { getPaginatedProducts } from '@/actions/products/products-pagination';
import { Title } from '@/components/ui/Title';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Gender } from '@/interfaces/products.interface';

interface Props {
  params: {
    gender: Gender;
  };
  searchParams: {
    page: string;
  };
}

const labels: Record<Gender, string> = {
  men: 'men',
  women: 'women',
  kid: 'kid',
  unisex: 'unisex',
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const sitesAllowed = ['women', 'men', 'kid'];
  const { gender } = params;
  if (!sitesAllowed.includes(gender)) notFound();

  const { data, totalPages } = await getPaginatedProducts({
    page: +searchParams.page || 1,
    gender,
  });
  if (!data.length) redirect(`/gender/${gender}/`);

  const title = `Articles for ${labels[gender]}`;

  return (
    <>
      <Title title={title} subtitle="Shop" className="mb-2" />
      <ProductGrid products={data} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
