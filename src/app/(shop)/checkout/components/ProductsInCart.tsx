'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { ProductImage } from '@/components/product/product-image/ProductImage';

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            alt={product.title}
            className="mr-5"
            style={{
              width: '100px',
              height: '100px',
            }}
          />
          <div>
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer"
            >
              {product.title} | Size: {product.size} ({product.quantity})
            </Link>
            <p className="font-bold">
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
