'use server';

import prisma from '@/lib/prisma';
import { Gender, Size } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const productSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  idCategory: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData);
    const productData = productSchema.safeParse(data);

    if (!productData.success) throw new Error(productData.error.message);

    const product = productData.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, '-');

    const { id, ...restProduct } = product;

    await prisma.$transaction(async (transaction) => {
      const sizes = restProduct.sizes as Size[];
      const tags = restProduct.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase());

      const product = id
        ? await transaction.product.update({
            where: { id },
            data: {
              ...restProduct,
              sizes,
              tags,
            },
          })
        : await transaction.product.create({
            data: {
              ...restProduct,
              sizes,
              tags,
            },
          });

      return product;
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/product/${product.slug}`);

    return {
      ok: true,
    };
  } catch (error) {
    throw error;
  }
};
