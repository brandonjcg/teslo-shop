'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { IoInformationOutline } from 'react-icons/io5';
import { authenticate } from '@/actions/auth/actions';
import { LoginButton } from './LoginButton';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if (state === 'Success') window.location.replace('/');
  }, [state]);

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

      {state === 'Invalid credentials' && (
        <div className="flex items-center mb-2">
          <IoInformationOutline className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{state}</p>
        </div>
      )}

      <LoginButton />

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
