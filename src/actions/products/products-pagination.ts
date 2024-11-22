'use server';

import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProducts = async ({
  page = 1,
  take = 12,
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
    });
    const totalRows = await prisma.product.count();

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
