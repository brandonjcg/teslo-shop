'use server';

import { signIn } from '@/auth.config';
import { ILogin } from '@/interfaces/user.interface';
import { AuthError } from 'next-auth';

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials';
        default:
          return 'Something went wrong';
      }
    }
    throw error;
  }
}

export const login = async ({ email, password }: ILogin) => {
  try {
    await signIn('credentials', {
      email,
      password,
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message || 'Something went wrong',
    };
  }
};
