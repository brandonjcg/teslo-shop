'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';

export const getOrderByUser = async () => {
  const session = await auth();
  if (!session?.user) return null;

  const order = await prisma.order.findMany({
    where: { idUser: session.user.id },
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

  return order;
};
