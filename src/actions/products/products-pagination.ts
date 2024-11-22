'use server';

import prisma from '@/lib/prisma';
import { Gender } from '@prisma/client';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProducts = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  try {
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          select: {
            url: true,
          },
          take: 2,
        },
      },
      where: {
        gender,
      },
    });
    const totalRows = await prisma.product.count({
      where: {
        gender,
      },
    });

    return {
      currentPage: page,
      totalPages: Math.ceil(totalRows / take),
      data: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch {
    throw new Error('Error fetching products');
  }
};
