import Link from 'next/link';
import { currencyFormat } from '@/utils/number';
import { ProductImage } from '@/components/product/product-image/ProductImage';
import { Title } from '@/components/ui/Title';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { getPaginatedProducts } from '@/actions/products/products-pagination';

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function AdminListProducts({ searchParams }: Props) {
  const { data, totalPages } = await getPaginatedProducts({
    page: +searchParams.page || 1,
  });

  return (
    <>
      <Title title="Products" />
      <div className="flex justify-end mb-5">
        <Link href="/admin/products/new" className="btn-primary">
          Create product
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Gender
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Stock
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Sizes
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
            {data?.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${item.slug}`}>
                    <ProductImage
                      src={item.images[0]}
                      alt={item.title}
                      width={50}
                      height={50}
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/products/${item.slug}`}
                    className="hover:underline"
                  >
                    {item.title}
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {currencyFormat(item.price)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.gender}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.inStock}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {item.sizes.join(', ')}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/admin/products/${item.slug}`}
                    className="hover:underline"
                  >
                    View product
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
