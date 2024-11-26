export const revalidate = 604800;

import { notFound } from 'next/navigation';
import { monsserat } from '@/fonts';
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
} from '@/components';
import { getProductBySlug } from '@/actions';

interface Props {
  params: {
    slug: string;
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
        <h1 className={`${monsserat.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* selector de tallas */}
        <SizeSelector selectedSize={product.sizes[1]} sizes={product.sizes} />

        {/* selector de cantidad */}
        <QuantitySelector quantity={2} />

        {/* button */}
        <button className="btn-primary my-5">Add to cart</button>

        {/* descripción */}

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
