'use server';

import {
  NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  PAYPAL_OAUTH_URL,
  PAYPAL_ORDERS_URL,
} from '@/config';
import { PaypalOrderStatusResponse } from '@/interfaces/paypal.interface';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const paypalCheckPayment = async (idTransaction: string) => {
  try {
    const token = await getPaypalBearerToken();
    if (!token) throw new Error('Could not get token from Paypal');

    const data = await verifyPaypalPayment(idTransaction, token);
    if (data?.status !== 'COMPLETED') throw new Error('Payment not completed');

    const { invoice_id: idOrder } = data.purchase_units[0];

    await prisma.order.update({
      where: { id: idOrder },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    revalidatePath(`/order/${idOrder}`);
  } catch (error) {
    throw error;
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  try {
    const base64Token = Buffer.from(
      `${NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
      'utf-8',
    ).toString('base64');

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    myHeaders.append('Authorization', `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'client_credentials');

    const result = await fetch(PAYPAL_OAUTH_URL, {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    }).then((response) => response.json());

    return result.access_token!;
  } catch {
    return null;
  }
};

export const verifyPaypalPayment = async (
  idTransaction: string,
  token: string,
): Promise<PaypalOrderStatusResponse | null> => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
  myHeaders.append('Authorization', `Bearer ${token}`);

  const url = `${PAYPAL_ORDERS_URL}/${idTransaction}`;
  const result = await fetch(url, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  }).then((response) => response.json());

  return result;
};
