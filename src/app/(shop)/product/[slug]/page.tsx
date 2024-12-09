export const revalidate = 604800;

import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { monsserat } from '@/fonts';
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  StockLabel,
} from '@/components';
import { getProductBySlug } from '@/actions';
import { AddToCart } from './ui';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const product = await getProductBySlug(slug);
  const response = {
    title: product?.title || `Product ${slug}`,
    description: product?.description || slug,
  };

  return {
    ...response,
    openGraph: {
      ...response,
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* desktop slide show */}
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
        <ProductMobileSlideShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
      </div>

      {/* detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />
        <h1 className={`${monsserat.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />
        {/* descripción */}

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
