'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

interface FormInputs {
  fullName: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    const { email, fullName, password } = data;
    console.log(
      `🚀 ${new Date().toLocaleString('en-US', { timeZone: 'America/Tijuana', hour12: false })} ~ onSubmit ~ email, fullName, password:`,
      email,
      fullName,
      password,
    );
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="fullName">Full name</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.fullName,
        })}
        type="text"
        autoFocus
        {...register('fullName', { required: true })}
      />
      {errors.fullName?.type === 'required' && (
        <p className="text-red-500">Full name is required</p>
      )}

      <label htmlFor="email">Email</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.email,
        })}
        type="email"
        {...register('email', {
          required: true,
          pattern: /^[^@]+@[^@]+\.[^@]+$/,
        })}
      />
      {errors.email?.type === 'required' && (
        <p className="text-red-500">Email is required</p>
      )}

      <label htmlFor="password">Password</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.password,
        })}
        type="password"
        {...register('password', { required: true, minLength: 8 })}
      />
      {errors.password?.type === 'required' && (
        <p className="text-red-500">Password is required</p>
      )}

      <br />

      <button className="btn-primary">Create account</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Login
      </Link>
    </form>
  );
};
