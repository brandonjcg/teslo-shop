import { Title } from '@/components/ui/Title';
import { UserTable } from './components/UserTable';
import { getPaginatedUsers } from '@/actions/user/get-paginated-orders';

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function AdminUsers({ searchParams }: Props) {
  const { data, totalPages } = await getPaginatedUsers({
    page: +searchParams.page || 1,
  });

  return (
    <>
      <Title title="Users" />

      <div className="mb-10">
        <UserTable users={data} totalPages={totalPages} />
      </div>
    </>
  );
}
