'use server';

import { auth } from '@/auth.config';
import { GLOBAL_TAX } from '@/constants/cart';
import { IAddressForm, Size } from '@/interfaces';
import prisma from '@/lib/prisma';

interface IProductToOrder {
  idProduct: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  data: IProductToOrder[],
  address: IAddressForm,
) => {
  const session = await auth();
  const idUser = session?.user?.id;
  if (!idUser) throw new Error('User not found');

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: data.map((item) => item.idProduct),
      },
    },
    select: {
      id: true,
      price: true,
      inStock: true,
    },
  });
  const cart = {
    itemsInOrder: 0,
    subTotal: 0,
    taxes: 0,
    total: 0,
  };

  for (const row of data) {
    cart.itemsInOrder += row.quantity;

    const product = products.find((item) => item.id === row.idProduct);
    if (!product) throw new Error(`Product not found: ${row.idProduct}`);

    if (product.inStock < row.quantity)
      throw new Error(`Not enough stock for product: ${product.id}`);

    cart.subTotal += product.price * row.quantity;
    cart.taxes = cart.subTotal * (GLOBAL_TAX / 100);
    cart.total = cart.subTotal + cart.taxes;
  }

  const idCountry = address.country;

  const transaction = await prisma.$transaction(async (prisma) => {
    const order = await prisma.order.create({
      data: {
        idUser,
        itemsInOrder: cart.itemsInOrder,
        subTotal: cart.subTotal,
        tax: cart.taxes,
        total: cart.total,

        OrderItem: {
          createMany: {
            data: data.map((item) => ({
              idProduct: item.idProduct,
              quantity: item.quantity,
              size: item.size,
              price:
                products.find((product) => product.id === item.idProduct)
                  ?.price ?? 0,
            })),
          },
        },
      },
    });

    const orderAddress = await prisma.orderAddress.create({
      data: {
        firstName: address.firstName,
        lastName: address.lastName,
        address: address.address,
        address2: address.address2,
        postalCode: address.postalCode,
        city: address.city,
        phone: address.phone,
        idOrder: order.id,
        idCountry,
      },
    });

    return {
      order,
      orderAddress,
    };
  });
};
