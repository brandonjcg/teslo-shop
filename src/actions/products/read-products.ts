'use server';

import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        ProductImage: true,
      },
    });
    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    throw error;
  }
};

export const getStockBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      select: {
        inStock: true,
      },
      where: { slug },
    });
    if (!product) return null;

    return product.inStock;
  } catch (error) {
    throw error;
  }
};
