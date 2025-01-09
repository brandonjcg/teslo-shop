'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const OrdenSummary = () => {
  const { getSummaryInfo } = useCartStore();
  const { totalItems, subTotal, taxes, total } = getSummaryInfo();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);
  if (!loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2">Order summary</h2>
      <div className="grid grid-cols-2">
        <span>Quantity of items</span>
        <span className="text-right">{totalItems}</span>

        <span>Sub total</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Taxes 8%</span>
        <span className="text-right">{currencyFormat(taxes)}</span>

        <span className="mt-5 text-2xl">Total</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>
      <div className="mt-5 mb-2 w-full">
        <Link
          className="flex btn-primary justify-center"
          href="/checkout/address"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};
