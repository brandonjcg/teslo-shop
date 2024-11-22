import prisma from '@/lib/prisma';
import { ProductWithoutImages } from '@/interfaces';
import { initialData } from './seed';

const main = async () => {
  if (process.env.NODE_ENV !== 'development') return;

  // reset tables
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // prepare data
  const { categories, products } = initialData;
  const categoriesToInsert = categories.map((name) => ({ name }));

  await prisma.category.createMany({
    data: categoriesToInsert,
  });

  const categoriesInDb = await prisma.category.findMany({
    select: { id: true, name: true },
  });
  const categoriesMap: Record<string, string> = {};

  categoriesInDb.forEach(
    ({ name, id }) => (categoriesMap[name.toLowerCase()] = id),
  );

  const newRows = products.map((product) => {
    const { type, ...newProduct }: ProductWithoutImages = { ...product };
    delete newProduct.images;

    return {
      ...newProduct,
      idCategory: categoriesMap[type.toLowerCase()],
    };
  });

  try {
    const createdProducts = await prisma.product.createManyAndReturn({
      data: newRows,
    });

    const productImages = products.flatMap((product) => {
      const idProduct = createdProducts.find(
        (row) => row.slug === product.slug,
      )?.id;
      if (!idProduct) return [];

      return product.images.map((image) => ({
        idProduct,
        url: image,
      }));
    });

    await prisma.productImage.createMany({
      data: productImages,
    });
  } catch (error) {
    console.error((error as Error).message);
  }
};

(() => main())();