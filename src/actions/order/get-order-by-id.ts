'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';

export const getOrderById = async (idOrder: string) => {
  const session = await auth();
  if (!session?.user) return null;

  const order = await prisma.order.findUnique({
    where: { id: idOrder, idUser: session.user.id },
    select: {
      id: true,
      isPaid: true,
      paidAt: true,
      createdAt: true,
      tax: true,
      subTotal: true,
      total: true,
      itemsInOrder: true,
      OrderItem: {
        select: {
          id: true,
          quantity: true,
          price: true,
          product: {
            select: {
              slug: true,
              title: true,
              ProductImage: {
                select: {
                  url: true,
                },
                take: 1,
                orderBy: {
                  id: 'desc',
                },
              },
            },
          },
        },
      },
      OrderAddress: {
        select: {
          id: true,
          address: true,
          address2: true,
          city: true,
          country: true,
          postalCode: true,
          phone: true,
        },
      },
      User: {
        select: {
          name: true,
        },
      },
    },
  });

  return order;
};
