'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';

export const setIdTransactionToOrder = async ({
  idOrder,
  idTransaction,
}: {
  idOrder: string;
  idTransaction: string;
}) => {
  const session = await auth();
  if (!session?.user) return null;

  const order = await prisma.order.update({
    where: { id: idOrder },
    data: {
      idTransaction,
    },
  });

  return order;
};
