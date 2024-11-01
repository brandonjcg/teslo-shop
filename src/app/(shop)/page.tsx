import { Title } from '@/components';
import { ProductGrid } from '@/components/products';
import { initialData } from '@/seed';

const products = initialData.products;

export default function ShopPage() {
  return (
    <>
      <Title title="Shop" subtitle="Shop page" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
