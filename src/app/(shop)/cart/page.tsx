import Link from 'next/link';
import { QuantitySelector, Title } from '@/components';
import { initialData } from '@/seed';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {
  const hasProducts = productsInCart.length > 0;
  if (!hasProducts) redirect('/empty');

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-2xl">Add more items</span>
            <Link href="/" className="underline mb-5">
              Continue shopping
            </Link>

            {/* items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
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
                  <p>{product.title}</p>
                  <p>{product.price}</p>
                  <QuantitySelector quantity={3} />
                </div>

                <button className="underline">Remove</button>
              </div>
            ))}
          </div>

          {/* sumary */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Order summary</h2>
            <div className="grid grid-cols-2">
              <span>Quantity of items</span>
              <span className="text-right">3</span>

              <span>Sub total</span>
              <span className="text-right">$4333</span>

              <span>Taxes 8%</span>
              <span className="text-right">$3</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">$4336</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/checkout/address"
              >
                Checkout
              </Link>
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
