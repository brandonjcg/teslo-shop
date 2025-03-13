'use client';

import Link from 'next/link';
import { useState } from 'react';
import { type Product } from '@/interfaces/products.interface';
import { ProductImage } from '../product/product-image/ProductImage';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <ProductImage
        src={displayImage}
        alt={product.title}
        width={500}
        height={500}
        className="w-full object-cover rounded transition-transform transform hover:scale-105"
        onMouseEnter={() => setDisplayImage(product.images[1])}
        onMouseLeave={() => setDisplayImage(product.images[0])}
      />
      <div className="p-4 flex flex-col hover:text-blue-600">
        <Link href={`/product/${product.slug}`}>{product.title}</Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
