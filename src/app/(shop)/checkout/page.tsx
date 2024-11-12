import Link from 'next/link';
import { Title } from '@/components';
import { initialData } from '@/seed';
import Image from 'next/image';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function Checkout() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Checkout" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-2xl">Update your cart</span>
            <Link href="/cart" className="underline mb-5">
              Edit cart
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
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* sumary */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Shipping address</h2>
            <div className="mb-10">
              <p className="text-2xl">Brandon Castillo</p>
              <p>Main street</p>
              <p>Downtown</p>
              <p>Los Angeles</p>
              <p>California</p>
              <p>USA</p>
              <p>90001</p>
              <p>Phone: 123456789</p>
            </div>
            <div className="w-full h-0.5 bg-gray-200 mb-10" />
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
              <Link
                className="flex btn-primary justify-center"
                href="/orders/1234"
              >
                Pay
              </Link>
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
