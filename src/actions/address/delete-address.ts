'use server';

import prisma from '@/lib/prisma';

export const deleteAddress = async (idUser: string) => {
  try {
    await prisma.userAddress.deleteMany({
      where: {
        idUser,
      },
    });
  } catch {
    throw new Error('Error in delete address');
  }
};
