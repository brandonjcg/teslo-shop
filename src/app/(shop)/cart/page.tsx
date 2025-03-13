import Link from 'next/link';

import { Title } from '@/components/ui/Title';
import { ProductsInCart } from './components/ProductsInCart';
import { OrdenSummary } from './components/OrdenSummary';

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-2xl">Add more items</span>
            <Link href="/" className="underline mb-5">
              Continue shopping
            </Link>

            <ProductsInCart />
          </div>

          <OrdenSummary />
        </div>
      </div>
    </div>
  );
}
