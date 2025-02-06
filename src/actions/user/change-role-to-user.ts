'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';
import { revalidatePath } from 'next/cache';

export const changeRole = async ({
  idUser,
  role,
}: {
  idUser: string;
  role: string;
}) => {
  try {
    const session = await auth();
    if (session?.user.role.toLocaleLowerCase() !== 'admin')
      throw new Error('Unauthorized');

    const roleToChange = role === 'admin' ? 'admin' : 'user';
    await prisma.user.update({
      where: { id: idUser },
      data: { role: roleToChange },
    });

    revalidatePath('/admin/users');
  } catch (error) {
    throw error;
  }
};
