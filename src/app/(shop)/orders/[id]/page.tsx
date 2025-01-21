import Image from 'next/image';
import { notFound } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { Title } from '@/components';
import { getOrderById } from '@/actions/order/get-order-by-id';
import { currencyFormat } from '@/utils';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;

  const order = await getOrderById(id);
  if (!order) notFound();

  const statusLabel = order.isPaid ? 'Order completed' : 'Order pending';

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-red-500': !order.isPaid,
                  'bg-green-500': order.isPaid,
                },
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">{statusLabel}</span>
            </div>
            {order.OrderItem.map((item) => (
              <div key={item.id} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  alt={item.product.title}
                  className="mr-5"
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                />
                <div>
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="hover:underline"
                  >
                    {item.product.title}
                  </Link>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Shipping address</h2>
            <div className="mb-10">
              <p className="text-2xl">{order.User.name}</p>
              <p>{order.OrderAddress?.address}</p>
              <p>{order.OrderAddress?.address2}</p>
              <p>{order.OrderAddress?.city}</p>
              <p>{order.OrderAddress?.country.name}</p>
              <p>{order.OrderAddress?.postalCode}</p>
              <p>{order.OrderAddress?.phone}</p>
            </div>
            <div className="w-full h-0.5 bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Order summary</h2>
            <div className="grid grid-cols-2">
              {order.isPaid && (
                <>
                  <span>Paid at</span>
                  <span className="text-right">
                    {order.paidAt?.toLocaleString()}
                  </span>
                </>
              )}

              <span>Quantity of items</span>
              <span className="text-right">{order.itemsInOrder}</span>

              <span>Sub total</span>
              <span className="text-right">
                {currencyFormat(order.subTotal)}
              </span>

              <span>Taxes {order.tax}%</span>
              <span className="text-right">{currencyFormat(order.tax)}</span>

              <span className="mt-5 text-2xl">Total</span>
              <span className="mt-5 text-2xl text-right">${order.total}</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                  {
                    'bg-red-500': !order.isPaid,
                    'bg-green-500': order.isPaid,
                  },
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2">{statusLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
