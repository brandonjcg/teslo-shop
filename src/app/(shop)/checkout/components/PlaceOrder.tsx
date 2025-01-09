'use client';

import { useEffect, useState } from 'react';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const { getSummaryInfo } = useCartStore();
  const { totalItems, subTotal, taxes, total } = getSummaryInfo();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    // delay for 2 seconds to simulate the order placement
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsPlacingOrder(false);
  };

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Shipping address</h2>
      <div className="mb-10">
        <p className="text-2xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>
          {address.city}, {address.country}, {address.postalCode}
        </p>
        <p>{address.phone}</p>
      </div>
      <div className="w-full h-0.5 bg-gray-200 mb-10" />
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
        <p className="mb-5">
          <span>
            By clicking `Pay`, you accept our{' '}
            <a href="#" className="underline">
              terms and conditions
            </a>{' '}
            and acknowledge that you have read our{' '}
            <a href="#" className="underline">
              privacy policy
            </a>{' '}
          </span>
        </p>
        {/* <p className="mb-5 text-red-500">Creation error</p> */}
        <button
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
          onClick={onPlaceOrder}
        >
          Pay
        </button>
      </div>
    </div>
  );
};
