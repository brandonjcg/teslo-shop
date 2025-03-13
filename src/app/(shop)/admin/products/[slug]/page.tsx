import { redirect } from 'next/navigation';

import { getCategories } from '@/actions/category/get-categories';
import { getProductBySlug } from '@/actions/products/read-products';
import { Title } from '@/components/ui/Title';
import { ProductForm } from './ui/ProductForm';

interface Props {
  params: {
    slug: string;
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  if (!product && slug !== 'new') redirect('/admin/products');

  const categories = await getCategories();

  const title = slug === 'new' ? 'New product' : 'Edit product';

  return (
    <>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
