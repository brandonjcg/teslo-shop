import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified: Date | null;
      role: string;
      image?: string;
      createdAt: string;
      updatedAt: string;
      deletedAt?: string;
    } & DefaultSession['user'];
  }
}
