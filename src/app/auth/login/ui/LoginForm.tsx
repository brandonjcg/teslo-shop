'use client';

import Link from 'next/link';
import { useFormState } from 'react-dom';
import { authenticate } from '@/actions';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  console.log(
    `🚀 ${new Date().toLocaleString('en-US', { timeZone: 'America/Tijuana', hour12: false })} ~ LoginForm ~ state:`,
    state,
  );

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Password</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <button className="btn-primary">Login</button>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Create new account
      </Link>
    </form>
  );
};
