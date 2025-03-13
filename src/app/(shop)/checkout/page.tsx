import Link from 'next/link';
import { Title } from '@/components/ui/Title';
import { ProductsInCart } from './components/ProductsInCart';
import { PlaceOrder } from './components/PlaceOrder';

export default function Checkout() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Checkout" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-2xl">Update your cart</span>
            <Link href="/cart" className="underline mb-5">
              Edit cart
            </Link>

            <ProductsInCart />
          </div>

          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
