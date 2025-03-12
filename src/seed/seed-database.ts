import prisma from '@/lib/prisma';
import { IProductSeed } from '@/interfaces';
import { initialData } from './seed';

const main = async () => {
  if (process.env.NODE_ENV !== 'development') return;

  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.userAddress.deleteMany();
  await prisma.country.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products, users, countries } = initialData;
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
    const { type, ...newProduct } = { ...product } as IProductSeed;
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

    await prisma.user.createMany({
      data: users,
    });

    await prisma.country.createMany({
      data: countries,
    });
  } catch (error) {
    console.error((error as Error).message);
  }
};

(() => main())();
