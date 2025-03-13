import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IAddressForm } from '@/interfaces/address.interface';

interface State {
  address: IAddressForm;
  setAddress: (address: State['address']) => void;
  getAddress: () => State['address'];
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
        rememberAddress: false,
      },
      setAddress: (address) => set({ address }),
      getAddress: () => get().address,
    }),
    {
      name: 'address-store',
    },
  ),
);
