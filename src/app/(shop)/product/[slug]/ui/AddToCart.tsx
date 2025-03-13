'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { Product, Size } from '@/interfaces/products.interface';
import { SizeSelector } from '@/components/product/size-selector/SizeSelector';
import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isReady, setIsReady] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const addProductToCart = () => {
    if (!size) return;

    addToCart({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0],
    });
    setIsReady(true);
    setSize(undefined);
    setQuantity(1);
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
