'use client';

import { useState } from 'react';
import { QuantitySelector, SizeSelector } from '@/components';
import { Product, Size } from '@/interfaces';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isReady, setIsReady] = useState(false);

  const addProductToCart = () => {
    if (!size) return;

    setIsReady(true);

    console.log({
      product: product.title,
      size,
      quantity,
    });
  };

  return (
    <>
      {!isReady && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Should select a size and quantity
        </span>
      )}

      <SizeSelector
        selectedSize={size}
        sizes={product.sizes}
        onSizeChange={setSize}
      />

      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* button */}
      <button className="btn-primary my-5" onClick={addProductToCart}>
        Add to cart
      </button>
    </>
  );
};
