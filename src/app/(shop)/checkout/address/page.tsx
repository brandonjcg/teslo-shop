import { Title } from '@/components';
import { getAddressByIdUser, getCountries } from '@/actions';
import { auth } from '@/auth.config';
import { AddressForm } from './ui';

export default async function AddressPage() {
  const countries = await getCountries();
  const session = await auth();
  const userAddressStored = await getAddressByIdUser(session!.user.id);

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm
          countries={countries}
          userStoredAddress={userAddressStored || {}}
        />
      </div>
    </div>
  );
}
