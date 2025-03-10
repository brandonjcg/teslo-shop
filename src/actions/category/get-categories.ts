'use server';

import { ICategory } from '@/interfaces/catalog.interface';
import prisma from '@/lib/prisma';

export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await prisma.category.findMany({
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
