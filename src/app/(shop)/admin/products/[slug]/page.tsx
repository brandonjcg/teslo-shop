import { getProductBySlug } from '@/actions';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';
import { getCategories } from '@/actions/category/get-categories';

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
