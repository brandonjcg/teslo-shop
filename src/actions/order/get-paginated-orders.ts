'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';

export const getPaginatedOrders = async ({
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

    const orders = await prisma.order.findMany({
      take,
      skip: (page - 1) * take,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        isPaid: true,
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    const totalRows = await prisma.order.count();

    return {
      currentPage: page,
      totalPages: Math.ceil(totalRows / take),
      data: orders,
    };
  } catch (error) {
    throw error;
  }
};
