import Image from 'next/image';
import { IoCardOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { Title } from '@/components';
import { initialData } from '@/seed';
import { GLOBAL_TAX } from '@/constants/cart';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrderPage({ params }: Props) {
  const { id } = params;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-red-500': false,
                  'bg-green-500': true,
                },
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Payment pending</span> */}
              <span className="mx-2">Order completed</span>
            </div>
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

              <span>Taxes {GLOBAL_TAX}%</span>
              <span className="text-right">$3</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">$4336</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                  {
                    'bg-red-500': false,
                    'bg-green-500': true,
                  },
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Payment pending</span> */}
                <span className="mx-2">Order completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
