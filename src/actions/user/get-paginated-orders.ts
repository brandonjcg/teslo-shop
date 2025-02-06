'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';

export const getPaginatedUsers = async ({
  page = 1,
  take = 12,
}: {
  page?: number;
  take?: number;
}) => {
  try {
    const session = await auth();
    if (session?.user.role.toLocaleLowerCase() !== 'admin')
      throw new Error('Unauthorized');

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    const users = await prisma.user.findMany({
      take,
      skip: (page - 1) * take,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    const totalRows = await prisma.user.count();

    return {
      currentPage: page,
      totalPages: Math.ceil(totalRows / take),
      data: users,
    };
  } catch (error) {
    throw error;
  }
};
