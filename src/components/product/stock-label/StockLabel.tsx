'use client';

import { useEffect, useState } from 'react';
import { getStockBySlug } from '@/actions/products';
import { monsserat } from '@/fonts';

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getStock = async () => {
      const stock = await getStockBySlug(slug);
      setStock(Number(stock));
      setIsLoading(false);
    };

    getStock();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <h1 className={`animate-pulse bg-gray-200`}>&nbsp;</h1>
      ) : (
        <h1 className={`${monsserat.className} antialiased font-bold text-lg`}>
          In stock: {stock}
        </h1>
      )}
    </>
  );
};
