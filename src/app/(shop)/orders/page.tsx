import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';
import { Title } from '@/components';
import { getOrderByUser } from '@/actions/order/get-order-by-user';

export default async function ListOrders() {
  const orders = await getOrderByUser();

  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.OrderAddress?.firstName} {item.OrderAddress?.lastName}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <IoCardOutline className="text-green-800" />
                  <span className="mx-2 text-green-800">
                    {item.isPaid ? 'Paid' : 'Not paid'}
                  </span>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link href={`/orders/${item.id}`} className="hover:underline">
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* TODO: add pagination */}
      </div>
    </>
  );
}
