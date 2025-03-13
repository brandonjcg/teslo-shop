'use server';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_URL } from '@/config';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

cloudinary.config(CLOUDINARY_URL);

export const deleteProductImage = async ({
  idImage,
  urlImage,
}: {
  idImage: string;
  urlImage: string;
}) => {
  try {
    if (!urlImage.startsWith('http')) return;

    const imageName = urlImage.split('/').pop()?.split('.')[0];
    if (!imageName) return;

    await cloudinary.uploader.destroy(imageName);
    const imageDeleted = await prisma.productImage.delete({
      where: { id: idImage },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath(`/admin/products/${imageDeleted.product.slug}`);
    revalidatePath(`/admin/product/${imageDeleted.product.slug}`);
    revalidatePath(`/product/${imageDeleted.product.slug}`);
  } catch (error) {
    throw error;
  }
};
