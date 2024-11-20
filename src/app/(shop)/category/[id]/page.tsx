import { Title } from '@/components';
import { ProductGrid } from '@/components/products';
import { Gender } from '@/interfaces';
import { initialData } from '@/seed';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: Gender;
  };
}

const seedProducts = initialData.products;

const labels: Record<Gender, string> = {
  men: 'men',
  women: 'women',
  kid: 'kid',
  unisex: 'unisex',
};

export default function CategoryPage({ params }: Props) {
  const sitesAllowed = ['women', 'men', 'kid'];
  if (!sitesAllowed.includes(params.id)) notFound();

  const products = seedProducts.filter(
    (product) => product.gender === params.id,
  );

  const title = `Articles for ${labels[params.id]}`;

  return (
    <>
      <Title title={title} subtitle="Shop" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
