'use server';

import { IAddressForm } from '@/interfaces';
import prisma from '@/lib/prisma';

export const createOrReplaceAddress = async (
  addressParam: IAddressForm,
  idUser: string,
) => {
  try {
    const addressToUpsert = {
      idUser,
      firstName: addressParam.firstName,
      lastName: addressParam.lastName,
      address: addressParam.address,
      address2: addressParam.address2,
      city: addressParam.city,
      postalCode: addressParam.postalCode,
      idCountry: addressParam.country,
      phone: addressParam.phone,
      updatedAt: new Date(),
    };

    const result = await prisma.userAddress.upsert({
      where: {
        idUser,
      },
      update: addressToUpsert,
      create: addressToUpsert,
    });

    return result;
  } catch {
    throw new Error('Error with upserting address');
  }
};
