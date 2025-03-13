'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { useAddressStore } from '@/store/address-store';
import { useCartStore } from '@/store/cart-store';
import { currencyFormat } from '@/utils/number';
import { placeOrder } from '@/actions/order/place-order';
import { GLOBAL_TAX } from '@/constants/cart';

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const { getSummaryInfo, clearCart } = useCartStore();
  const { totalItems, subTotal, taxes, total } = getSummaryInfo();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((item) => ({
      idProduct: item.id,
      quantity: item.quantity,
      size: item.size,
    }));

    const response = await placeOrder(productsToOrder, address);
    if (response.error) {
      setIsPlacingOrder(false);
      setErrorMessage(response.message);
      return;
    }

    clearCart();

    router.replace(`/orders/${response.idOrder}`);
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

        <span>Taxes {GLOBAL_TAX}%</span>
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

        <p className="mb-5 text-red-500">{errorMessage} </p>

        <button
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
        >
          Pay
        </button>
      </div>
    </div>
  );
};
