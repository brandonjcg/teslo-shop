'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart-store';
import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { currencyFormat } from '@/utils/number';
import { ProductImage } from '@/components/product/product-image/ProductImage';

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity,
  );
  const removeProduct = useCartStore((state) => state.removeProduct);
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
              {product.title} | Size: {product.size}
            </Link>
            <p>{currencyFormat(product.price)}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
          </div>

          <button className="underline" onClick={() => removeProduct(product)}>
            Remove
          </button>
        </div>
      ))}
    </>
  );
};
