'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store';
import { QuantitySelector } from '@/components';
import Link from 'next/link';

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity,
  );
  const [, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
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
              {product.title}
            </Link>
            <p>{product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
          </div>

          <button className="underline">Remove</button>
        </div>
      ))}
    </>
  );
};
