'use server';

import prisma from '@/lib/prisma';

export const getAddressByIdUser = async (idUser: string) => {
  try {
    const result = await prisma.userAddress.findFirst({
      where: {
        idUser,
      },
    });
    if (!result) return null;

    return {
      ...result,
      country: result.idCountry,
      address2: result.address2 || '',
    };
  } catch {
    throw new Error('Error getting address');
  }
};
