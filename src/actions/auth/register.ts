'use server';

import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    const emailFormatted = email.toLowerCase();
    const user = await prisma.user.create({
      data: {
        name,
        email: emailFormatted,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      error: false,
      user,
      message: 'User registered successfully',
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  }
};
