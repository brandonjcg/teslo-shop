'use server';

import prisma from '@/lib/prisma';

export const getCountries = async () => {
  try {
    const response = await prisma.country.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
      },
    });

    return response;
  } catch {
    return [];
  }
};
